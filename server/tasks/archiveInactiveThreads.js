const { archiveThreads, getStaleThreads } = require('../services/messages');

module.exports = async (logger) => {
  // console.log('This is the archive inactive message threads runner module');
  logger.info('This is the archive inactive message threads runner module');

  const archivableThreads = await getStaleThreads();

  console.log(archivableThreads.length);

  const threadIds = archivableThreads.map((t) => t.threadId);

  await archiveThreads(threadIds);
};
