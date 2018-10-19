import firebase from 'firebase-admin';
import { Article } from './types';
import serviceAccount from './serviceAccountKey.json';

class Database {

    db: firebase.database;

    constructor() {
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount),
            databaseURL: "https://engagementapp-a5c33.firebaseio.com/"
        });

        this.db = firebase.database();
    }

    async getArticles(): Promise<Array<Article>> {
        const ref = this.db.ref('/articles');
        const articleMap = (await ref.once('value')).val();
        return Object.values(articleMap);
    }

    async addArticle(article: Article): Promise<void> {
        await this.db.ref('/articles').push(article);
    }
}

export default Database;




