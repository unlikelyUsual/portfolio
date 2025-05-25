---
layout: ../../layouts/post.astro
title: "Automate Posting from Reddit to Instagram"
pubDate: 2024-10-05
description: "Reddit videos and posts them to Instagram automatically"
author: "Prabhat"
excerpt: My personal content assistant that finds viral Reddit videos and posts them to Instagram automatically
image:
  src:
  alt:
tags: ["ai", "reddit", "python", "instagram"]
---

# From Reddit to Instagram: How I Automated My Content Curation with Python 🤖

Ever found yourself endlessly scrolling through Reddit, thinking "this would be perfect for my Instagram"? I sure did! That's why I built **AutoPostBot** - my personal content assistant that finds viral Reddit videos and posts them to Instagram automatically. Let me show you how it works and how you can build one too!

## The Content Creator's Dilemma 😫

As someone managing social media accounts, I faced a common challenge:

1. Finding fresh, engaging content daily is **time-consuming**
2. Downloading Reddit videos is **technically tricky** (separate audio/video streams)
3. Coming up with relevant hashtags requires **creative energy**
4. Posting consistently requires **discipline**

I wanted to focus on engagement and strategy, not the repetitive grunt work. So I automated it!

## How AutoPostBot Works 🔍

The system follows a simple workflow:

1. **Find**: Scans top posts from popular subreddits like r/Damnthatsinteresting, r/funny, r/aww
2. **Filter**: Selects only video posts (non-NSFW) and ranks by popularity
3. **Download**: Handles Reddit's separate video/audio streams and merges them
4. **Tag**: Uses AI (OpenAI or Hugging Face) to generate relevant hashtags
5. **Post**: Uploads to Instagram with proper caption and hashtags
6. **Clean up**: Removes the local file after successful upload

All of this happens automatically on a schedule!

## The Technical Magic ✨

### Reddit Fetching

```python
def get_reddit_videos(sub_reddits, num_top_posts=3):
    # Connect to Reddit API
    reddit = praw.Reddit(
        client_id=os.environ.get("REDDIT_CLIENT_ID"),
        client_secret=os.environ.get("REDDIT_CLIENT_SECRET"),
        user_agent=os.environ.get("REDDIT_USER_AGENT"),
    )

    # Collect video posts
    video_posts = []
    for subreddit_name in sub_reddits:
        subreddit = reddit.subreddit(subreddit_name)
        top_posts = subreddit.top(limit=num_top_posts, time_filter='day')

        # Filter for videos only
        for post in top_posts:
            if post.is_video and not post.over_18:
                video_posts.append({
                    "title": post.title,
                    "url": post.url,
                    "subreddit": subreddit_name,
                    "score": post.score,
                })

    # Sort by popularity
    return sorted(video_posts, key=lambda x: x["score"], reverse=True)
```

### Smart Hashtag Generation

The coolest part? The bot uses AI to generate relevant hashtags based on the content:

```python
def generate_instagram_tags(subreddit, posttitle):
    prompt = f"""You are an Instagram expert. Generate a list of 10 relevant
    and trending hashtags for the following Reddit post that will be uploaded to Instagram.

    Subreddit: {subreddit}
    post title: {posttitle}

    Only return the hashtags as a space-separated list. Do not include explanations."""

    # Using OpenAI's GPT-4o
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "developer", "content": "Talk like a pirate."},
            {"role": "user", "content": prompt},
        ],
    )

    return response.choices[0].message['content'].strip()
```

I even added a fun "Talk like a pirate" system message to get more creative hashtags! 🏴‍☠️

## Setting It Up Yourself 🛠️

Want to build your own? Here's how:

1. **Clone the repo and install dependencies**:

   ```bash
   git clone https://github.com/yourusername/AutoPostBot.git
   cd AutoPostBot
   pip install -r requirements.txt
   ```

2. **Set up your environment variables** in a `.env` file:

   ```
   REDDIT_CLIENT_ID='your_reddit_client_id'
   REDDIT_CLIENT_SECRET='your_reddit_client_secret'
   REDDIT_USER_AGENT='your_app_name'
   INSTA_USER_USERNAME='your_instagram_username'
   INSTA_USER_PASSWORD='your_instagram_password'
   REDDIT_MAX_POSTS=1
   OPENAI_API_KEY='your_openai_api_key'
   ```

3. **Run it manually** to test:

   ```bash
   python main.py
   ```

4. **Schedule it** to run daily using cron, Task Scheduler, or a cloud service

## Beyond Memes: Practical Applications 💼

While I built this for fun, there are serious applications:

- **Digital Marketing**: Curate niche content for themed accounts
- **Community Management**: Share relevant industry news automatically
- **Content Research**: Discover trending topics in your field
- **Brand Monitoring**: Track and repost content related to your brand

## The Results? 📈

Since implementing AutoPostBot:

- My posting consistency improved from "whenever I remember" to **daily**
- Engagement increased by ~35% due to better hashtags and consistent posting
- I saved approximately 1 hour per day of manual work
- My account growth rate doubled in just two months

## Final Thoughts 💭

Building AutoPostBot taught me that even creative tasks can benefit from automation. By letting the bot handle the repetitive parts, I can focus on strategy and engagement.

The best part? It's completely customizable. You can add more subreddits, change the filtering criteria, or even modify the AI prompt to match your brand voice.

So, what will you automate next? 🚀
