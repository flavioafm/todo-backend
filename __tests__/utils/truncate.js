const database = require('../../src/config/database');

module.exports = async () => {
    // for (const collection in database.connection.collections) {
    //     if (database.connection.collections.hasOwnProperty(collection)) {
    //         await database.connection.collections[collection].deleteMany();
    //     }
    // } 

    // const collections = Object.keys(database.connection.collections)
    // for (const collectionName of collections) {
    //   console.log('>>>>>>>> collectionName', collectionName);      
    //   const collection = database.connection.collections[collectionName]
    //   try {
    //     await collection.drop()
    //   } catch (error) {
    //     // This error happens when you try to drop a collection that's already dropped. Happens infrequently. 
    //     // Safe to ignore. 
    //     if (error.message === 'ns not found') return
  
    //     // This error happens when you use it.todo.
    //     // Safe to ignore. 
    //     if (error.message.includes('a background operation is currently running')) return
  
    //     console.log(error.message)
    //   }
    // }

    const collections = Object.keys(database.connection.collections)
    for (const collectionName of collections) {
        const collection = database.connection.collections[collectionName]
        await collection.deleteMany()
    }

}