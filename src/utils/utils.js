const addCreateOrConnectQuery = (records) => {
    const query = [];
    for (let i = 0; i < records.length; i++) {
        const record = records[i];
        // console.log(record)
        const querified = {
            where: record,
            create: record
        }
        query.push(querified)
    }
    return query
}

module.exports = {
    addCreateOrConnectQuery
}