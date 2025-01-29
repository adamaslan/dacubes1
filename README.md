# Welcome to my 3d portfolio page!

- Its built on Remix and Vite 📖 [Remix docs](https://remix.run/docs)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.


## adding glb 

<DaCubes4 
  cubes={[
    { 
      name: 'Bunny', 
      link: '/pets',
      modelUrl: '/models/cute_bunny.glb' 
    },
    { 
      name: 'Cloud', 
      link: '/weather',
      modelUrl: '/models/fluffy_cloud.glb' 
    },
    {
      name: 'Star',
      link: '/space',
      modelUrl: '/models/sparkly_star.glb'
    }
  ]}
  movementIntensity={0.7}
  textSize={0.8}
/>