import { supabase, Customer, Campaign, Rule, RuleGroup } from './supabase';
import { toast } from '@/components/ui/use-toast';

export async function getCustomers(): Promise<Customer[]> {
  try {
    const { data, error } = await supabase.from('customers').select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching customers:', error);
    toast({
      variant: "destructive",
      title: "Error fetching customers",
      description: "There was a problem with your request."
    });
    return [];
  }
}

export async function getCampaigns(): Promise<Campaign[]> {
  try {
    const { data, error } = await supabase.from('campaigns').select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    toast({
      variant: "destructive",
      title: "Error fetching campaigns",
      description: "There was a problem with your request."
    });
    return [];
  }
}

export async function createCampaign(campaign: Omit<Campaign, 'id' | 'created_at'>): Promise<Campaign | null> {
  try {
    const { data, error } = await supabase
      .from('campaigns')
      .insert([{ ...campaign, created_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    toast({
      variant: "destructive",
      title: "Error creating campaign",
      description: "There was a problem with your request."
    });
    return null;
  }
}

export async function estimateAudience(ruleGroup: RuleGroup): Promise<number> {
  try {
    // Convert the rule group to a PostgreSQL query
    const { rules, operator } = ruleGroup;
    const conditions = rules.map(rule => {
      const { field, operator: op, value } = rule;
      return `${field} ${op} ${typeof value === 'string' ? `'${value}'` : value}`;
    }).join(` ${operator} `);

    const query = `
      SELECT COUNT(*) 
      FROM customers 
      WHERE ${conditions}
    `;

    const { count, error } = await supabase.rpc('estimate_audience', { query_string: query });
    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error estimating audience:', error);
    return 0;
  }
}

export async function simulateDelivery(campaignId: string, message: string): Promise<{sent: number, failed: number, total: number}> {
  try {
    const { data: campaign, error: campaignError } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', campaignId)
      .single();
    
    if (campaignError) throw campaignError;

    // Insert communication logs
    const { data: logs, error: logsError } = await supabase
      .from('communication_logs')
      .insert([
        {
          campaign_id: campaignId,
          message,
          status: 'SENT',
          sent_at: new Date().toISOString()
        }
      ])
      .select();

    if (logsError) throw logsError;

    // Get statistics
    const { data: stats, error: statsError } = await supabase
      .from('communication_logs')
      .select('status', { count: 'exact' })
      .eq('campaign_id', campaignId)
      .group_by('status');

    if (statsError) throw statsError;

    const sent = stats?.find(s => s.status === 'SENT')?.count || 0;
    const failed = stats?.find(s => s.status === 'FAILED')?.count || 0;
    
    return {
      sent,
      failed,
      total: sent + failed
    };
  } catch (error) {
    console.error('Error simulating delivery:', error);
    return { sent: 0, failed: 0, total: 0 };
  }
}

export async function generateAIMessages(campaignIntent: string): Promise<string[]> {
  try {
    if (!campaignIntent?.trim()) {
      return [
        "We noticed you've been shopping with us and we'd love to offer you a special discount on your next purchase.",
        "As a valued customer, we're excited to share an exclusive offer with you.",
        "Thank you for being a loyal customer. We have something special just for you!"
      ];
    }

    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        messages: [
          {
            role: 'system',
            content: 'You are a marketing expert. Generate 3 unique, engaging marketing messages based on the campaign intent provided. Each message should be concise, persuasive, and suitable for email or SMS campaigns.'
          },
          {
            role: 'user',
            content: campaignIntent
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate messages');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    return content
      .split(/\d+\./)
      .filter(Boolean)
      .map(msg => msg.trim());

  } catch (error) {
    console.error('Error generating messages:', error);
    return [
      "We noticed you've been shopping with us and we'd love to offer you a special discount on your next purchase.",
      "As a valued customer, we're excited to share an exclusive offer with you.",
      "Thank you for being a loyal customer. We have something special just for you!"
    ];
  }
}