export type Author = {
  name: string;
  display_name: string;
  avatar: string;
  email: string;
  gravatar?: string;
  web?: string;
  twitter?: string;
  description?: string;
};

export const AUTHORS: Record<string, Author> = {
  pkadu: {
    name: "Parag Kadu",
    display_name: "Parag Kadu",
    avatar: "/assets/images/avatar/pkadu-avatar.png",
    email: "pkadu@omnissa.com",
  },
  samarp: {
    name: "Samar Prakash",
    display_name: "Samar Prakash",
    avatar: "/assets/images/avatar/samarp-avatar.png",
    email: "samarp@omnissa.com",
  },
  ashroti: {
    name: "Aditya Shrotri",
    display_name: "Aditya Shrotri",
    avatar: "/assets/images/avatar/ashrotri-avatar.png",
    email: "ashrotri@omnissa.com",
  },
  jbedient: {
    name: "Jason Bedient",
    display_name: "Jason Bedient",
    avatar: "/assets/images/avatar/jbedient-avatar.png",
    email: "jbedient@omnissa.com",
  },
  parrellad: {
    name: "Dan Parrella",
    display_name: "Dan Parrella",
    avatar: "/assets/images/avatar/parrellad-avatar.png",
    email: "parrellad@omnissa.com",
  },
  john: {
    name: "John",
    display_name: "John",
    avatar: "/assets/images/avatar.png",
    gravatar: "b1cc14991db7a456fcd761680bbc8f81",
    email: "wowthemesnet@gmail.com",
    web: "https://www.wowthemes.net",
    twitter: "https://twitter.com/wowthemesnet",
    description: "This is the author box. Write a short description of the author here.",
  },
  kartikkumarp: {
    name: "Kartik Patel",
    display_name: "Kartik Patel",
    avatar: "/assets/images/avatar/kartikkumarp-avatar.png",
    email: "kartikkumarp@omnissa.com",
  },
  wtian: {
    name: "Wei Tian",
    display_name: "Wei Tian",
    avatar: "/assets/images/avatar/wtian-avatar.webp",
    email: "wtian@omnissa.com",
  },
  jbroch: {
    name: "Josh Broch",
    display_name: "Josh Broch",
    avatar: "/assets/images/avatar/jbroch-avatar.jpg",
    email: "jbroch@omnissa.com",
  },
  ghichborn: {
    name: "Geoffrey Hichborn",
    display_name: "Geoffrey Hichborn",
    avatar: "/assets/images/avatar/ghichborn-avatar.png",
    email: "ghichborn@omnissa.com",
  }
};
