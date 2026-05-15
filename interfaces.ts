export interface ContactMethod {
  label: string;
  url: string;
}

export interface ContactInfo {
  contactOffice: string;
  contactMethods: ContactMethod[];
}

export interface Resource {
  category: string;
  title: string;
  subtitle: string;
  description: string;
  audience: string;
  contactInfo: string;
  link: string;
}
