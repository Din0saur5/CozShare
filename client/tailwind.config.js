/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}', "./node_modules/tailwind-datepicker-react/dist/**/*.js", ],
  theme: {
    extend: {

      backgroundImage: {
        'elfgirl': "url('https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/home-images/elfgirl.jpeg?t=2024-01-01T20%3A07%3A30.937Z')", 
        'imagineWiz':"url('https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/home-images/imagineWiz.png?t=2024-01-01T20%3A07%3A39.179Z')",
        'workspace': "url('https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/home-images/workspace.jpeg?t=2024-01-01T20%3A07%3A47.656Z')",
        'yell': "url('https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/home-images/yell.jpeg?t=2024-01-01T18%3A38%3A30.819Z')"
      },
      height: {
       '4/5': "80vh",
       '9/10': "90vh",
      },
      scale: {
        '200': '2.00',
        '225': '2.25',
      },
      width: {
        'bg': 'calc(100vw - 20rem)', 
      },
      margin: {
        'rightside':'calc(100vw-10rem)',
      },
      colors: {
        third: '#af4670',
      },
      aspectRatio: {
        '3/2': '3 / 2',
      },



    },
  },
  plugins: [
    require('daisyui'),
   
  ],
  daisyui:{
    themes: [
      {emerald:{
        ...require("daisyui/src/theming/themes")["emerald"],
          primary: '#af4670',
      }}, "coffee" ]
  }
}

