import { http } from '@http';

export const dictionaryOptions = (arr) => {
    let newArr = [];
    if (arr?.length > 0) {
        arr.forEach((item) => {
            let find = newArr.find((it) => it.key == item.dictType.split('::')[1]);
            find ? find.options.push(item) : newArr.push({ key: item.dictType.split('::')[1], options: [item] });
        });
        return newArr;
    }
    return [];
};

// 加载所有异步选项
const loadOptions = async (columns) => {
    const promises = columns.flatMap((item) =>
        item.items
            .filter((i) => (i.type === 'select-tree' || i.type === 'select') && i.serviceUrl)
            .map(async (i) => {
                try {
                    const data = await http.get(i.serviceUrl);
                    i.options = i.filter ? i.filter(data) : data.data;
                } catch (error) {
                    console.error(`加载 ${i.label} 选项失败:`, error);
                    i.options = [];
                }
            })
    );

    await Promise.all(promises);
};

// 分组处理 columns
const groupColumns = (columns) => {
    const _columns = {};

    columns.forEach((item) => {
        item.items.forEach((i) => {
            if (i.use) {
                i.use.forEach((use) => {
                    const key = use + 'Columns';
                    _columns[key] = _columns[key] || [];
                    _columns[key].push(i);
                });
            }
        });
    });

    return _columns;
};

// 主函数
export const staticColumsHandle = async (columns) => {
    // 先加载所有选项
    await loadOptions(columns);

    // 再分组
    return groupColumns(columns);
};

export const columnsHandle = async (columns, serviceName) => {
    const _columns = {};
    const treeColumns = [].concat(...columns.map((item) => item.items)).filter((item) => (item.type == 'select-tree' || item.type == 'select') && item.serviceUrl);
    // const selectColumns = [].concat(...columns.map((item) => item.items)).filter((item) => item.type == 'select');
    const treeResult = await Promise.all(treeColumns.map((item) => http.get(item.serviceUrl)));
    treeResult.forEach((item, index) => {
        item ? (treeColumns[index].options = item.data) : '';
    });

    columns.forEach((item) => {
        item.items.forEach((i) => {
            if (i.use) {
                i.use.forEach((use) => {
                    _columns[use + 'Columns']?.push(i) ?? (_columns[use + 'Columns'] = [i]);
                });
            }
        });
    });

    return Promise.resolve(_columns);
};
