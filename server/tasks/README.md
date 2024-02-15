#### Async short running tasks

1. Implement the task in a file / module: the main handler should be an async
   function taking `logger` as the first parameter and then any subsequent args
   passed from the command line

2. Require the main handler in the `index.js` and export it under the name to
   be called from the command line

3. The logger writes ephemeral messages (ttl 30 days) to the Mongo DB under the
   `LogEntry` model - it is very useful for observability and debugging etc. to
   persist logs to the DB

4. Test the implementation locally by calling the task runner directly on the
   command line like `node runner <handler_name> arg_1 arg_2` - the logger only
   writes to DB on prod and uses a console transport locally

5. We are using the heroku scheduler - the trigger is set up in the heroku
   console, where you can define a simple schedule / rate and then provide the
   command to run (same as for testing locally)
