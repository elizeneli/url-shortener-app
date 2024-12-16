import supabase from "./supabase";

export const addUrlToDb = async (originalUrl, expireTime, shortUrl) => {
  const { data, error } = await supabase
    .from("short_links")
    .insert([
      {
        original_url: originalUrl,
        short_url: shortUrl,
        click_count: 0,
        expiration_time: expireTime,
      },
    ])
    .select("*")
    .single();

  if (error) {
    console.error("Error adding URL to database:", error.message);
    return null;
  }

  return data;
};

export const fetchUrls = async () => {
  const { data, error } = await supabase.from("short_links").select("*");

  if (error) {
    console.error("Error fetching URLs:", error.message);
    return [];
  }

  return data;
};

export const deleteUrlFromDb = async (id) => {
  const { error } = await supabase.from("short_links").delete().eq("id", id);

  if (error) {
    console.error("Error deleting URL:", error.message);
    return false;
  }

  return true;
};
