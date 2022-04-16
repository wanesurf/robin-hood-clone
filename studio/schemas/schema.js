// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'
import {userSchema} from "./userSchema";
import {transactionsSchema} from "./transactionsSchema";

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
//schema : how you want to stucture the data you store in the database
  // on met dans les differents schema dans le array
  types: schemaTypes.concat([userSchema,transactionsSchema]),
})
