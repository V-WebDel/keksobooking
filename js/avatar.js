const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'svg'];

const fileAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview img');

const fileRooms = document.querySelector('.ad-form__input');
const containerPreview = document.querySelector('.ad-form__photo');
const imgPreview =  new Image(70, 70);

fileAvatar.addEventListener('change', () => {
  const file = fileAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

  if (matches) {
    previewAvatar.src = URL.createObjectURL(file);
  }
});

fileRooms.addEventListener('change', () => {
  const files = fileRooms.files;

  if (files.length > 0) {

    containerPreview.innerHTML = '';

    for (const file of files) {

      const reader = new FileReader();
      const fileName = file.name.toLowerCase();
      const matches = FILE_TYPES.some((extension) => fileName.endsWith(extension));

      reader.onload = function() {

        if (matches) {
          imgPreview.src = URL.createObjectURL(file);
          imgPreview.alt = 'Фотография жилья';
        }

        containerPreview.appendChild(imgPreview);
      };

      reader.readAsDataURL(file);
    }
  }

});
