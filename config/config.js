const config={  // as sometimes env times didnt get loaded so entire app crashes to prevent that we build another file and then export it
    appwriteurl:String(import.meta.env.VITE_APPWRITE_URL),
    appwriteprojectid:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwritedatabaseid:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteuserinfoDatabaseid:String(import.meta.env.VITE_APPWRITE_USERINFO_DATABASE_ID),
    appwriteuserinfocollectionid:String(import.meta.env.VITE_APPWRITE_USERINFO_COLLECTION_ID),
    appwritecollectionid:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwritebucketid:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymceapikey:String(import.meta.env.VITE_TINYMCE_API_KEY)
}
export default config;