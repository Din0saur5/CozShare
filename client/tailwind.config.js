/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {

      backgroundImage: {
        'elfgirl': "url('/images/elfgirl.jpeg')",
        'imagineWiz':"url('/images/imagineWiz.png')",
        'workspace': "url('/images/workspace.jpeg')",
        'yell': "url('https://mgofmfewguhdxnissjvz.supabase.co/storage/v1/object/public/home-images/yell.jpeg?t=2024-01-01T18%3A38%3A30.819Z')"
      },
      height: {
       '4/5': "80vh",
       '9/10': "90vh",
      },
      scale: {
        '200': '2.00',
        '225': '2.25',
      }



    },
  },
  plugins: [
    require('daisyui'),
   
  ],
  daisyui:{
    themes: ["valentine", "coffee" ]
  }
}

