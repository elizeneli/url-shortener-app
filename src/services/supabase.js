import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ogffyfnxiouodlslksvm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9nZmZ5Zm54aW91b2Rsc2xrc3ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQyMDcyMjAsImV4cCI6MjA0OTc4MzIyMH0.grCGmKqcvu7XtTK5jzCLXyMaKo6zfrwi2n4nGuhXwnk";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
