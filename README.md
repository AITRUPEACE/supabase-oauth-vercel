## Getting Started

## Important Notes
Thank you to Daily Web Coding for the tutorial and the boilerplate repo: https://github.com/Chensokheng/next-supabase-boilerplate
Setting up OAuth, Supabase: https://www.youtube.com/watch?v=7aYgxQ6QAjs&list=PLYHXTr4kGJjEPOZ_RqZG2uIguJCdA5ezT&index=2
  ## Vercel Deployment
    -  Point the vercel project to the repo
    --  We want to replace localhost:3000 everywhere, and set the right URLs and redirect URLs
    -  Supabase configuration: Project -> Authentication -> URL Configuration
      -  set Site URL to your deployed app's URL (Vercel URL in this case): https://[your-project-name].vercel.app/
      -  set Redirect URLs to your site URL, and siteUrl/auth/callback  (replace [id] with the actual value)
        - https://supabase-oauth-vercel-[id]-r34cts-projects.vercel.app/
        - https://supabase-oauth-vercel-[id]-r34cts-projects.vercel.app\
        - https://supabase-oauth-vercel-[id]-r34cts-projects.vercel.app/auth/callback
    -  Google Cloud Console configuration: 
      -  https://console.cloud.google.com/apis/credentials
      -  APIs and services -> Credentials -> OAuth 2.0 Client IDs -> [click on Web client 1 , or whatever your ClientID is called]
      -  Authorised JavaScript origins : make sure URIs 1 * is set to your vercel app url (eg. https://[your-project-name].vercel.app)
      -  Authorised redirect URLs : set this to your supabase callback URL (eg. https://ridrvvtgvwptnvevjhpt.supabase.co/auth/v1/callback)

First, run the development server:

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
-   [Supabase](https://supabase.com/) - Build in a weekend Scale to millions.
-   [Shadcn](https://ui.shadcn.com/) - Build your component library.
-   [React Query](https://tanstack.com/query/latest/) - TanStack Query.

## Profile table

```sql
create table
  public.profiles (
    id uuid not null,
    created_at timestamp with time zone not null default now(),
    email text not null,
    display_name text null,
    image_url text null,
    constraint profiles_pkey primary key (id),
    constraint profiles_id_fkey foreign key (id) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;
```

## Auth Trigger Function

```sql
begin

  insert into public.profiles(id,email,display_name,image_url)
  values(
    new.id,
    new.raw_user_meta_data ->> 'email',
    COALESCE(new.raw_user_meta_data ->> 'user_name',new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;

end;
```

### Auth Trigger Creation

```sql
create trigger create_user_on_signup
after insert on auth.users for each row
execute function create_user_on_signup ();
```

### Remove Trigger

```sql
drop trigger create_user_on_signup on auth.users;
```
