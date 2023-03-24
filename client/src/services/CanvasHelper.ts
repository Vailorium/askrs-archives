const FE_HEROES_FONT = `${process.env.REACT_APP_CDN_URL}/assets/fonts/Fire_Emblem_Heroes_Font.woff`;

const CanvasHelper = {
  FEHFont: new FontFace('Fire_Emblem_Heroes_Font', `url(${FE_HEROES_FONT})`),
  loadImage: async (ref: string): Promise<HTMLImageElement> => new Promise((resolve) => {
    const image: HTMLImageElement = new Image();
    image.src = ref;
    image.onload = () => {
      resolve(image);
    };
    image.onerror = (err) => {
      console.log(err);
    };
  }),
  loadFEHFont: async (): Promise<null> => new Promise((resolve) => {
    if (CanvasHelper.FEHFont.status === 'loaded') {
      return resolve(null);
    }
    return CanvasHelper.FEHFont.load().then(() => {
      document.fonts.add(CanvasHelper.FEHFont);
      resolve(null);
    });
  }),
  drawFEHText: (ctx: CanvasRenderingContext2D, text: string, x: number, y: number) => {
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  },
};
export default CanvasHelper;
