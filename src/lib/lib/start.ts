import BaseController from '@ctsy/controller/dist/base_controller';
import { Models } from '../iface/models';
import Model from '@ctsy/model';
import server from '@ctsy/server';
export default class Start extends BaseController {
    async start() {
        let model = this.M(Models.Account);
        try {
            let rs = await model.exec("desc tabl_name;", 'RAW')
        } catch (error) {

        }

    }
}