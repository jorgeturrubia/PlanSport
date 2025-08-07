namespace SportPlannerApi.Configuration;

public class SupabaseSettings
{
    public const string SectionName = "Supabase";
    
    public string Url { get; set; } = string.Empty;
    public string Key { get; set; } = string.Empty;
}

public class DatabaseSettings
{
    public const string SectionName = "DatabaseSettings";
    
    public bool UseSupabase { get; set; }
    public int CommandTimeout { get; set; } = 30;
}