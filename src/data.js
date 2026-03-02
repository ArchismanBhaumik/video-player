export const API_KEY = 'AIzaSyBWxeXFzSgJhuXRbGlskvCGHUJ7iQq3G_k'

export const valueConverter =(views)=>{
    if(views>=1000000){
        return Math.floor(views/1000000) + 'M'
    }
    if(views>=1000){
         return Math.floor(views/1000) + 'K'
    }else{
        return views;
    }
}