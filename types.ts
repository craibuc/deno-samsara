export type DriverCreateType = {
  name: string;
  username: string;
  password: string;
  driverActivationStatus?: "active" | "deactivated";
  phone?: string;
  licenseNumber?: number;
  licenseState?: string;
  externalIds?: {
    [key: string]: string;
  };
  notes?: string;
};

export type DriverUpdateType = {
  name?: string;
  username?: string;
  password?: string;
  driverActivationStatus?: "active" | "deactivated";
  phone?: string;
  licenseNumber?: number;
  licenseState?: string;
  externalIds?: {
    [key: string]: string;
  };
  notes?: string;
};