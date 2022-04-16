export const transactionsSchema = {
    name:'transactions',
    title:'Transations',
    type:'document',
    fields: [
        {
            name:'txHash',
            title:'Transaction Hash',
            type:'string',
        },
        {
            name:'fromAddress',
            title: 'From (Wallet Adress)',
            type:'string',
        },
        {
            name:'toAdress',
            title:'To (Wallet Adress',
            type:'string',
        },
        {
            name:'amount',
            title:'Amount',
            type:'number',
        },
        {
            name:'timeStamp',
            title:'TimeStamp',
            type:'datetime'

        }
    ]
}