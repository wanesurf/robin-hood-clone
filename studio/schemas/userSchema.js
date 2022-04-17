export const userSchema = {
    name : 'users',
    title : 'Users',
    type : 'document',
    fields: [
        {
            name: 'address',
            title: 'Wallet Adress',
            type: 'string'
        },
        {
            name:'userName',
            title:'User Name',
            type:'string'
        },
        {
            //everytime we made an exchange that's c'est considéré as transaction.Il faut sauvegarder les transaction et d
            // avoir une reférence des transaction que l'utilisateur a fait
            name:'transaction',
            title:'Transactions',
            type:'array',
            of: [
                {
                    //creer une reference au fichier transactions
                    type: 'reference',
                    to:[{type:'transactions'}],
                }
            ]

        }
    ]
}
//document : lightweight record with field and values --> objet