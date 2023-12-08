# Nuxt 3 Event Management App

## Setup

Create a New Nuxt Project

```
npx nuxi@latest init receipe-book-final
```

Add Remote Repo to the project
git remote add origin `https://github.com/prishanf/nuxt-event-management.git`

Install Packages Dependancies

```
yarn add @nuxt/ui nuxtjs/supabase jsforce
```

Update the Next Config file: `app.config.ts`

```bash
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxt/ui',],
  runtimeConfig: {
    sfUserName: process.env.SF_USER || "SF user name",
    sfPassword: process.env.SF_PASSWORD || "SF password",
  }
})
```

Create configuration to Enable Theming :`app.config.ts`

```bash
export default defineAppConfig({
  ui: {
    primary: 'green',
    gray: 'cool'
  }
})
```

## Developement Setup

### Create Folders for F/E Development

```
/components
/pages
/layouts
```

### Create Folders for Backend Development

```
/api
/api/event
/api/guest
/api/contact
```

### Set Env Vairiables for Suparbase, Salesforce

create new `.env` file and add below Variables

```bash
SUPABASE_URL=Supabase URL
SUPABASE_KEY=Suparbase Project Api Key
SF_USER=username
SF_PASSWORD=password + security tocken
```

### Push Code to Git

commit code to the git repository

```
git commit -m "base setup"
git push -u origin master
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Deployer Vercel Edge Server

- Create Vercel App
- Link GitHub Repository
- Add Env Veriable (create key value for items in you `.env `file)


Development Example:

Create Layout Page
Crete components
    - Header
    -
Create Pages

Creae Api End points



# Appendix

Example Files

`.env`

```bash
SUPABASE_URL=https://<yourorgid>.supabase.com
SUPABASE_KEY=Suparbase Project Api Key
SF_USER=username
SF_PASSWORD=password + security tocken
```

`app.config.ts`

```bash
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/supabase', '@nuxt/ui',],

  runtimeConfig: {
    sfUserName: process.env.SF_USER || "SF user name",
    sfPassword: process.env.SF_PASSWORD || "SF password",
  }
})

```

`SalesforceDataService.ts`

```bash

import jsforce from 'jsforce';

export class SalesforceService {

    private static instance: SalesforceService

    config = useRuntimeConfig()

    public connection :jsforce.Connection | undefined

    private constructor() { }

    public static async getInstance(): Promise<SalesforceService> {
        if (!SalesforceService.instance) {
            SalesforceService.instance = new SalesforceService();
            await SalesforceService.instance.login();
        }
        return SalesforceService.instance;
    }

    private async login() {
        let data = {connection:null, user:null};
        let conn = new jsforce.Connection({});
        const username = this.config.sfUserName;
        const password = this.config.sfPassword;
        await conn.login(username, password, function(err, userInfo) {
        if (err) { return console.error(err); }
            console.log("User ID: " + userInfo.id);
            console.log("Org ID: " + userInfo.organizationId);
        });
        this.connection =  conn;

    }

    public async queryData(query:string){
        let resp = await this.connection?.query(query,function(err, result) {
            if (err) { return err }
            console.log("total : " + result.totalSize);
            console.log("fetched : " + result.records.length);
            let final = result.records.map((item)=>{
                delete item['attributes'];
                return item
            })
            return final;
          });

        return resp;
    }

    public async retrieveRecord(objetName:string,id:string){
       return this.connection?.sobject(objetName).retrieve(id, function(err:string, data:object) {
            if (err) { return err; }
            return data;
        });
    }

    //{ Name : 'My Account #1' }
    public async createRecord(objetName:string, record:object|[]){
        return this.connection?.sobject(objetName).create(record, function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log("Created records id : " + ret);
            return ret;
        });

    }
    // Should have id field { Id : '0017000000hOMChAAO', Name : 'Updated Account #1' }
    public async updateRecord(objetName:string, record:object|[]){
        return this.connection?.sobject(objetName).update(record, function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log("updated records : " + ret);
            return ret;
        });

    }

    public async deleteRecord(objetName:string, recordId:string){
        return this.connection?.sobject(objetName).destroy(recordId, function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log("delete records : " + ret);
            return ret;
        });

    }

    public async deleteRecords(objetName:string, recordIds: string[]){
        return this.connection?.sobject(objetName).destroy(recordIds, function(err, ret) {
            if (err) { return console.error(err, ret); }
            console.log("delete records : " + ret);
            return ret;
        });

    }

    public async upsertRecord(objetName:string, record:object|[], externalIdField:string){
        return this.connection?.sobject(objetName).upsert(record,externalIdField, function(err, ret) {
            if (err || !ret.success) { return console.error(err, ret); }
            console.log("upserted records : " + ret);
            return ret;
        });

    }

}
```

```bash
<UForm :validate="validate" :state="state" class="space-y-4" @submit="handleLogin">
    <UFormGroup label="Email" name="email">
    <UInput v-model="state.email" />
    </UFormGroup>
    <UFormGroup label="Password" name="password">
    <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit">
    Submit
    </UButton>
</UForm>
<script setup>
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const loading = ref(false)
const state = reactive({
  email: undefined,
  password: undefined
})

const validate = (state) => {
  const errors = []
  if (!state.email) errors.push({ path: 'email', message: 'Required' })
  if (!state.password) errors.push({ path: 'password', message: 'Required' })
  return errors
}

const handleLogin = async (e) => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithPassword({ email: e.data.email, password: e.data.password })
    if (error) throw error

  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>
```

### Supabase
https://supabase.com/dashboard/project/smtuzoeezlgatclepiuv/auth/url-configuration

### GIT
https://github.com/prishanf/nuxt-event-management

###
https://vercel.com/prishanf/nuxt-event-management