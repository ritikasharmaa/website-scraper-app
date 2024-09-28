
  type socialProfile = {
    platform?: string;
    link?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
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