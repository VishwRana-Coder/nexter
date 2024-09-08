const { username, password } = process.env;


export const connectionStr =
  "mongodb+srv://" + username + ":" + password + "@cluster.1ytin.mongodb.net/nexter?retryWrites=true&w=majority&appName=Cluster";