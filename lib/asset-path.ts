export const assetPath=(path:string)=>`${process.env.NEXT_PUBLIC_BASE_PATH||''}${path}`;
export const mediaPath=(path:string)=>`${(process.env.NEXT_PUBLIC_MEDIA_ORIGIN||'').replace(/\/$/,'')}${process.env.NEXT_PUBLIC_MEDIA_ORIGIN?'':process.env.NEXT_PUBLIC_BASE_PATH||''}${path}`;
