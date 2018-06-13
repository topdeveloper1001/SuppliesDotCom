namespace SuppliesDotCom.Repository.UOW
{
    using System;

    using SuppliesDotCom.Model;
    using SuppliesDotCom.Repository.GenericRepository;
    using SuppliesDotCom.Repository.Interfaces;

    public class UnitOfWork : IUnitOfWork
    {
        #region Fields
        private readonly BillingEntities _context = new BillingEntities(); // create mfentities class object\


        private AuditLogRepository _AuditLogRepository;


        private BillingCodeTableSetRepository _BillingCodeTableSetRepository;

        private CorporateRepository _CorporateRepository;

        private DashboardDisplayOrderRepository _DashboardDisplayOrderRepository;

        private DashboardIndicatorDataRepository _DashboardIndicatorDataRepository;

        private DashboardIndicatorsRepository _DashboardIndicatorsRepository;

        private DashboardParametersRepository _DashboardParametersRepository;

        private DashboardRemarkRepository _DashboardRemarkRepository;

        private DeptTimmingRepository _DeptTimmingRepository;

        private EquipmentLogRespository _EquipmentLogRespository;

        private FacilityDepartmentRepository _FacilityDepartmentRepository;

        private FacilityRoleRepository _FacilityRoleRepository;

        private IndicatorDataCheckListRepository _IndicatorDataCheckListRepository;

        private ModuleAccessRepository _ModuleAccessRepository;

        private ParametersRepository _ParametersRepository;

        private ProjectTargetsRepository _ProjectTargetsRepository;

        private RoleTabsRepository _RoleTabsRepository;

        private TabsRepository _TabsRepository;


        private BillingSystemParametersRepository _SuppliesDotComParametersRepository;

        private CityRepository _cityRepository;

        private CountryRepository _countryRepository;


        private DashboardBudgetRepository _dashboardBudgetRepository;

        private DashboardTargetsRepository _dashboardTargetsRepository;

        private DashboardTransactionCounterRepository _dashboardTransactionCounterRepository;

        private bool _disposed;


        private EquipmentRepository _equipmentRepository;

        private FacilityRepository _facilityRepository;

        private FacilityStructureRepository _facilityStructureRepository;

        private GlobalCodeCategoryRepository _gCodeCategoryRepository;

        private GlobalCodeRepository _globalCodeRepository;

        private LoginTrackingRepository _loginTrackingRepository;

        private RolePermissionRepository _rolePermissionRepository;

        private RoleRepository _roleRepository;


        private StateRepository _stateRepository;

        private SystemConfigurationRepository _systemConfigurationRepository;

        private UserRoleRepository _userRoleRepository; // Ashwani

        private UsersRepository _usersRepository;

        #endregion


        #region Public Properties

        public AuditLogRepository AuditLogRepository
        {
            get
            {
                return _AuditLogRepository ?? (_AuditLogRepository = new AuditLogRepository(_context));
            }
        }



        public BillingCodeTableSetRepository BillingCodeTableSetRepository
        {
            get
            {
                return _BillingCodeTableSetRepository
                       ?? (_BillingCodeTableSetRepository = new BillingCodeTableSetRepository(_context));
            }
        }

        public BillingSystemParametersRepository SuppliesDotComParametersRepository
        {
            get
            {
                return _SuppliesDotComParametersRepository
                       ?? (_SuppliesDotComParametersRepository =
                           new BillingSystemParametersRepository(_context));
            }
        }



        public CityRepository CityRepository
        {
            get
            {
                if (_cityRepository == null)
                {
                    _cityRepository = new CityRepository(_context);
                }

                return _cityRepository;
            }
        }

        public CorporateRepository CorporateRepository
        {
            get
            {
                if (_CorporateRepository == null)
                {
                    _CorporateRepository = new CorporateRepository(_context);
                }

                return _CorporateRepository;
            }
        }

        public CountryRepository CountryRepository
        {
            get
            {
                if (_countryRepository == null)
                {
                    _countryRepository = new CountryRepository(_context);
                }

                return _countryRepository;
            }
        }

        public DashboardBudgetRepository DashboardBudgetRepository
        {
            get
            {
                if (_dashboardBudgetRepository == null)
                {
                    _dashboardBudgetRepository = new DashboardBudgetRepository(_context);
                }

                return _dashboardBudgetRepository;
            }
        }

        public DashboardDisplayOrderRepository DashboardDisplayOrderRepository
        {
            get
            {
                return _DashboardDisplayOrderRepository
                       ?? (_DashboardDisplayOrderRepository = new DashboardDisplayOrderRepository(_context));
            }
        }

        public DashboardIndicatorDataRepository DashboardIndicatorDataRepository
        {
            get
            {
                if (_DashboardIndicatorDataRepository == null)
                {
                    _DashboardIndicatorDataRepository = new DashboardIndicatorDataRepository(_context);
                }

                return _DashboardIndicatorDataRepository;
            }
        }

        public DashboardIndicatorsRepository DashboardIndicatorsRepository
        {
            get
            {
                if (_DashboardIndicatorsRepository == null)
                {
                    _DashboardIndicatorsRepository = new DashboardIndicatorsRepository(_context);
                }

                return _DashboardIndicatorsRepository;
            }
        }

        public DashboardParametersRepository DashboardParametersRepository
        {
            get
            {
                if (_DashboardParametersRepository == null)
                {
                    _DashboardParametersRepository = new DashboardParametersRepository(_context);
                }

                return _DashboardParametersRepository;
            }
        }

        public DashboardRemarkRepository DashboardRemarkRepository
        {
            get
            {
                if (_DashboardRemarkRepository == null)
                {
                    _DashboardRemarkRepository = new DashboardRemarkRepository(_context);
                }

                return _DashboardRemarkRepository;
            }
        }

        public DashboardTargetsRepository DashboardTargetsRepository
        {
            get
            {
                return _dashboardTargetsRepository
                       ?? (_dashboardTargetsRepository = new DashboardTargetsRepository(_context));
            }
        }

        public DashboardTransactionCounterRepository DashboardTransactionCounterRepository
        {
            get
            {
                if (_dashboardTransactionCounterRepository == null)
                {
                    _dashboardTransactionCounterRepository =
                        new DashboardTransactionCounterRepository(_context);
                }

                return _dashboardTransactionCounterRepository;
            }
        }

        public DeptTimmingRepository DeptTimmingRepository
        {
            get
            {
                if (_DeptTimmingRepository == null)
                {
                    _DeptTimmingRepository = new DeptTimmingRepository(_context);
                }

                return _DeptTimmingRepository;
            }
        }

        public EquipmentLogRespository EquipmentLogRespository
        {
            get
            {
                if (_EquipmentLogRespository == null)
                {
                    _EquipmentLogRespository = new EquipmentLogRespository(_context);
                }

                return _EquipmentLogRespository;
            }
        }

        public EquipmentRepository EquipmentRepository
        {
            get
            {
                if (_equipmentRepository == null)
                {
                    _equipmentRepository = new EquipmentRepository(_context);
                }

                return _equipmentRepository;
            }
        }

        public FacilityDepartmentRepository FacilityDepartmentRepository
        {
            get
            {
                if (_FacilityDepartmentRepository == null)
                {
                    _FacilityDepartmentRepository = new FacilityDepartmentRepository(_context);
                }

                return _FacilityDepartmentRepository;
            }
        }

        public FacilityRepository FacilityRepository
        {
            get
            {
                if (_facilityRepository == null)
                {
                    _facilityRepository = new FacilityRepository(_context);
                }

                return _facilityRepository;
            }
        }

        public FacilityRoleRepository FacilityRoleRepository
        {
            get
            {
                if (_FacilityRoleRepository == null)
                {
                    _FacilityRoleRepository = new FacilityRoleRepository(_context);
                }

                return _FacilityRoleRepository;
            }
        }

        public FacilityStructureRepository FacilityStructureRepository
        {
            get
            {
                if (_facilityStructureRepository == null)
                {
                    _facilityStructureRepository = new FacilityStructureRepository(_context);
                }

                return _facilityStructureRepository;
            }
        }

        public GlobalCodeCategoryRepository GlobalCodeCategoryRepository
        {
            get
            {
                if (_gCodeCategoryRepository == null)
                {
                    _gCodeCategoryRepository = new GlobalCodeCategoryRepository(_context);
                }

                return _gCodeCategoryRepository;
            }
        }

        public GlobalCodeRepository GlobalCodeRepository
        {
            get
            {
                if (_globalCodeRepository == null)
                {
                    _globalCodeRepository = new GlobalCodeRepository(_context);
                }

                return _globalCodeRepository;
            }
        }



        public IndicatorDataCheckListRepository IndicatorDataCheckListRepository
        {
            get
            {
                if (_IndicatorDataCheckListRepository == null)
                {
                    _IndicatorDataCheckListRepository = new IndicatorDataCheckListRepository(_context);
                }

                return _IndicatorDataCheckListRepository;
            }
        }

        public LoginTrackingRepository LoginTrackingRepository
        {
            get
            {
                if (_loginTrackingRepository == null)
                {
                    _loginTrackingRepository = new LoginTrackingRepository(_context);
                }

                return _loginTrackingRepository;
            }
        }

        public ModuleAccessRepository ModuleAccessRepository
        {
            get
            {
                if (_ModuleAccessRepository == null)
                {
                    _ModuleAccessRepository = new ModuleAccessRepository(_context);
                }

                return _ModuleAccessRepository;
            }
        }

        public ParametersRepository ParametersRepository
        {
            get
            {
                if (_ParametersRepository == null)
                {
                    _ParametersRepository = new ParametersRepository(_context);
                }

                return _ParametersRepository;
            }
        }

        public ProjectTargetsRepository ProjectTargetsRepository
        {
            get
            {
                if (_ProjectTargetsRepository == null)
                {
                    _ProjectTargetsRepository = new ProjectTargetsRepository(_context);
                }

                return _ProjectTargetsRepository;
            }
        }

        public RolePermissionRepository RolePermissionRepository
        {
            get
            {
                if (_rolePermissionRepository == null)
                {
                    _rolePermissionRepository = new RolePermissionRepository(_context);
                }

                return _rolePermissionRepository;
            }
        }

        public RoleRepository RoleRepository
        {
            get
            {
                if (_roleRepository == null)
                {
                    _roleRepository = new RoleRepository(_context);
                }

                return _roleRepository;
            }
        }

        public RoleTabsRepository RoleTabsRepository
        {
            get
            {
                if (_RoleTabsRepository == null)
                {
                    _RoleTabsRepository = new RoleTabsRepository(_context);
                }

                return _RoleTabsRepository;
            }
        }

        public StateRepository StateRepository
        {
            get
            {
                if (_stateRepository == null)
                {
                    _stateRepository = new StateRepository(_context);
                }

                return _stateRepository;
            }
        }

        public SystemConfigurationRepository SystemConfigurationRepository
        {
            get
            {
                if (_systemConfigurationRepository == null)
                {
                    _systemConfigurationRepository = new SystemConfigurationRepository(_context);
                }

                return _systemConfigurationRepository;
            }
        }

        public TabsRepository TabsRepository
        {
            get
            {
                if (_TabsRepository == null)
                {
                    _TabsRepository = new TabsRepository(_context);
                }

                return _TabsRepository;
            }
        }

        public UserRoleRepository UserRoleRepository
        {
            get
            {
                if (_userRoleRepository == null)
                {
                    _userRoleRepository = new UserRoleRepository(_context);
                }

                return _userRoleRepository;
            }
        }

        public UsersRepository UsersRepository
        {
            get
            {
                return _usersRepository ?? (_usersRepository = new UsersRepository(_context));
            }
        }


        #endregion

        #region Public Methods and Operators

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion

        #region Methods

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }

            _disposed = true;
        }

        #endregion
    }
}
