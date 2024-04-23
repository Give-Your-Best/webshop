const { archiveThreads, getStaleThreads } = require('../services/messages');

/**
 * Set `archived: true` on message threads where `archived` property currently
 * unset and thread last updated more than 6 months ago. Archived threads will
 * no longer appear in the default messages admin views but will be accessible
 * and can be unarchived and rearchived...
 */
module.exports = async (logger) => {
  // Pull all message threads not active in the last six months but also neither
  // already archived nor unarchived.
  const archivableThreads = await getStaleThreads();

  if (!archivableThreads.length) {
    logger.info('No message threads to archive');
    return;
  }

  const threadIds = archivableThreads.map((t) => t.threadId);

  await archiveThreads(threadIds);

  logger.info(`Archived ${archivableThreads.length} stale message threads`, {
    metadata: {
      threadIds,
    },
  });
};
