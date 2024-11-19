import 'reflect-metadata';
import { runSeeders } from 'typeorm-extension';
import { dataSource } from '../data-source';

async function run() {
  try {
    await dataSource.initialize();
    await runSeeders(dataSource, {
      seedTracking: true,
    });
    console.log('Seeders executed successfully');
  } catch (error) {
    console.error('Error executing seeders:', error.message);
  } finally {
    await dataSource.destroy();
  }
}

run().catch((error) => console.error(error));
