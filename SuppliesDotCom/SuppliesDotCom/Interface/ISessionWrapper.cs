namespace SuppliesDotCom.Interface
{
    public interface ISessionWrapper
    {
        string SessionGroupId { get; set; }
        string SelectedCulture { get; set; }
        string PreviousGroupId { get; set; }
        string SecretLogin { get; set; }
        string SessionUtcDiffWithuniversalTime { get; set; }
        string IsDayLight { get; set; }
        string TimezoneName { get; set; }
        
    }
}