import Controller from '@ctsy/controller/dist/controller';
export default class Users extends Controller {
    // get _KeywordTable()
    get _KeywordFields() {
        return 'Name,Nick,Account'.split(',')
    }
    get _KeywordTable() {
        return 'UsersSearch'
    }
    async add() { }
    async adds() { }
    async save() { }
    async saveW() { }
    async del() { }
    async delW() { }
    async replaceW() { }
}