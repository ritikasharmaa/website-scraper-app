
  type socialProfile = {
    platform?: string | undefined;
    link?: string | undefined;
    facebook?: string | undefined;
    linkedin?: string | undefined;
    twitter?: string | undefined;
    instagram?: string | undefined;
  }
  
   type  Company = {
      _id: number;
    company: string;
    name:string;
    logo: string;
    socialProfiles: socialProfile;
    description: string;
    address: string;
    phone: string;
    email: string;
    website?:string;
    screenshot?:string;
  }

  export type {
    socialProfile,
    Company
  }