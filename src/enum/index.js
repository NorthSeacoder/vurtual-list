/**
 * @author lany44
 * @date 2018/4/21-下午5:33
 * @file index
 */

const QUERY_STATE_TYPE = {
    INIT: 'INIT',
    PROCESSING: 'PROCESSING',
    DONE: 'DONE'
};

const DATA_STRUCTURE = {
    MAP: 'map',
    LIST: 'list',
    FOREST: 'forest'
};

const DEFAULT_VALUE_FIELD = 'id';
const DEFAULT_TEXT_FIELD = 'name';

export default class Enum {

    queryState = QUERY_STATE_TYPE.INIT;

    queryPromise = null;

    /**
     *
     * @param {*} map
     * @param {*} options :
     * {
     * structure:string(map|list|forest),
     * supportFilter:boolean,
     * getFilterText:()=>{},getFilterExtra:()=>{}
     * }
     */
    static from(list, options = {}) {
        const yqgEnum = new Enum();

        yqgEnum.populate(list, {structure: DATA_STRUCTURE.LIST, ...options});
        return yqgEnum;
    }

    populate(data, options = {}) {
        const self = this;
        const {
            valueField = DEFAULT_VALUE_FIELD,
            textField = DEFAULT_TEXT_FIELD,
            structure = DATA_STRUCTURE.LIST,
            onHandleRecord = () => {}
        } = options;

        self.MAP = {};
        self.FILTERMAP = {};
        self.TYPE = {};
        self.LIST = [];
        self.FOREST = [];
        self.find = cond => self.LIST.find(item => Object.keys(cond).every(key => item[key] === cond[key]));
        self.filterData = filterDataFn => {
            const yqgEnum = new Enum();
            yqgEnum.populate(self.LIST.filter(filterDataFn));
            return yqgEnum;
        };

        self.findNoState = cond => self.LIST.find(item => Object.keys(cond).every(
                    key => Number(item[key]) === Number(cond[key])
                ));

        switch (structure) {
            case DATA_STRUCTURE.MAP: {
                Object.keys(data).forEach(key => {
                    self.MAP[key] = data[key];
                    self.TYPE[key] = key;
                    self.LIST.push({
                        [key]: data[key],
                        [valueField]: key,
                        [textField]: data[key]
                    });
                });
                break;
            }
            case DATA_STRUCTURE.LIST: {
                data.forEach(record => {
                    onHandleRecord(record);
                    self.MAP[record[valueField]] = record[textField];
                    self.TYPE[record[valueField]] = record[valueField];
                    self.LIST.push(record);
                });
                break;
            }
            case DATA_STRUCTURE.FOREST: {
                const rec = node => {
                    onHandleRecord(node);
                    self.MAP[node[valueField]] = node[textField];
                    self.TYPE[node[valueField]] = node[valueField];
                    self.LIST.push(node);
                    if (node.children && node.children.length > 0) {
                        node.children.forEach(child => rec(child));
                    }
                };

                data.forEach(node => rec(node));
                self.FOREST = data;
                break;
            }
            default: {
                // ignore
            }
        }
    }

}
