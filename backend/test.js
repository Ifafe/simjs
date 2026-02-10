try {
      require('express');
      console.log('express ok');
      require('cors');
      console.log('cors ok');
      require('dotenv');
      console.log('dotenv ok');
      require('multer');
      console.log('multer ok');
      require('@prisma/client');
      console.log('prisma client ok');
      console.log('ALL OK');
} catch (e) {
      console.error(e);
}
