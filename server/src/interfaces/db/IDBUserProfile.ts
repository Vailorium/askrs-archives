interface IDBUserProfile {
  uid: string;
  username: string;
  picture?: number;
  friendCode?: string;
  socials: {
    reddit?: string;
    twitter?: string;
    youtube?: string;
  };
  favoriteHeroes: Array<Number>;
  favoriteARD: Array<string>;
  favoriteARO: Array<string>;
}
export default IDBUserProfile;
