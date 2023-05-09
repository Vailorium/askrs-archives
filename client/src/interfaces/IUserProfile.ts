interface IUserProfile {
  uid: string;
  username: string;
  picture?: number;
  friendCode?: string;
  socials: {
    reddit?: string;
    twitter?: string;
    youtube?: string;
  };
  favoriteBuilds: Array<string>;
  favoriteHeroes: Array<number>;
  favoriteARD: Array<string>;
  favoriteARO: Array<string>;
}
export default IUserProfile;
