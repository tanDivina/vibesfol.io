import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read environment variables
const supabaseUrl = 'https://zmhkrvrdmjndktbdedbk.supabase.co';
const supabaseServiceKey = 'sb_secret_fIOPXHDBBbueDFaYFq616g_v2uFqH_8';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  try {
    console.log('Reading gamification migration file...');
    const migrationSQL = fs.readFileSync(join(__dirname, 'gamification_migration.sql'), 'utf8');
    
    console.log('Running gamification migration...');
    const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL });
    
    if (error) {
      console.error('Migration failed:', error);
      process.exit(1);
    }
    
    console.log('✅ Gamification migration completed successfully!');
    console.log('Created tables:');
    console.log('- achievements');
    console.log('- user_achievements');
    console.log('- portfolio_scores');
    console.log('- user_streaks');
    console.log('- leaderboard_entries');
    console.log('');
    console.log('Inserted default achievements and set up RLS policies.');
    
  } catch (err) {
    console.error('Error running migration:', err);
    process.exit(1);
  }
}

runMigration();
