import { createClient } from 'tdl';
import './config';
import { TELEGRAM_CONFIG } from './config';

const client = createClient({
  apiId: TELEGRAM_CONFIG.apiId,
  apiHash: TELEGRAM_CONFIG.apiHash,
  databaseDirectory: '_td_database',
  filesDirectory: '_td_files',
});

client.on('error', console.error);

// client.on('update', (update) => {
//   console.log('Got update:', update);
// });

(async () => {
  try {
    // Login as a user
    await client.login(() => ({
      type: 'user',
      getPhoneNumber: async () => TELEGRAM_CONFIG.phoneNumber,
    }));

    {
      const me = await client.invoke({
        _: 'getMe',
      });
      console.log('Logged in as:', me);
    }
    {
      const chats = await client.invoke({
        _: 'getChats',
        chat_list: { _: 'chatListMain' },
        limit: 50,
      });
      console.log('A part of my chat list:', chats);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
})();
