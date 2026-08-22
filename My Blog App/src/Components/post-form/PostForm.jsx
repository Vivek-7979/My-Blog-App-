import React ,{useCallback , useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button , Input , Select , RTE } from '../Index'
import appwriteService from '../../Appwrite/Configs'
import { data, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {

const { register , handleSubmit , watch , setValue , control , getValues } = 
useForm({
defaultValues: {
        title: post?.title || '',          // dekho user hun dohve kaam krn a skda - ya new pos paun lei ya exisiting edit kara lei . Je teh edit karn aya mtlb already post hai firr -> Database vicho post di info chakke '.' naal acess krke us post vicho show krvado 
        slug : post?.slug || '' ,
        content : post?.content || '',
        status : post?.status || 'active',
},
})  // This is useForm hook from the react-hook-form library . To understand its all working and features . We have to read its documentation deeply .


const navigate = useNavigate()                                  // navigation feature from router
const userData = useSelector( state => state.user.userData )   // Here by using the 'useSelector' from react-redux library {know for its advanced state management feature } . We accessed the userData from the state in which user is stored 
 
// method jihde naal post update ya new create honi 
const submit = async (data) =>{

  if (post) {  // je taah post pehla toh hi hai mtlb uploaded post nu update karna 

    const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null  // je teh image haigi hai sara data vicho taah image oh chk ke array di 1st hai jo ohnu upload krvado appwrite de database vicho 
    

           if(file) {  // Hun image haigi hai teh oh upload bhi krva diti database vicho chak ke .. Ohnu file naam de dita va 
               appwriteService.deleteFile(post.featuredImage)  // hun oh file nu delete kr dena apa neh jehri upload kiti c bcz tah hi fir navi upload honii 
           }

           const dbPost = await appwriteService.updatePost ( post.$id , {
                              ...data,
                              featuredImage : file? file.$id : undefined ,
           }) // is vich hun apa updatepost ala method call krvaya AuthSerive ali file vicho jo ki values le reha jehri ohnu chaidi hai and update krunga post apne logic naal 
            
            if ( dbPost) ( navigate (`post/${dbPost.$id}`))  // je teh ho rehi a post update dbvicho then ohnu oh specifc id ute jo route pr hai uthe navigate krvado 
  
          }     

else {   //Simple -> je teh post hai hi nhi isda matlab hai ki new post upload honi tah apa appwriteService use krde hoye fresh post upload karni 
 
  const file = await appwriteService.uploadFile(data.image[0]);  // file upload kr diti apa post jehri pauni 
 
  if(file) {

    const fileId = file.$id
    data.featuredImage = fileId  // jo apa appwrite vich image nu keha va ga oh keh dita va ga ffeatured image nu 

    const dbPost = await appwriteService.createPost({
      ...data ,
      userId: userData.$id,
    }) // Hun create post through naal userData redux naal data de dita 

      if(dbPost) { navigate(`/post/${dbPost.$id}`)}  // Hun post jado create ho gyie vi gi taah ohnu redirecct krvado oh specific route pr
  }

}

}  

// This is a functionality in which if we write the title and give space between them then the slug value box will conveert that space into dash "-" . UseCallback is used because :- To want the memoization in which the component will not re-render as only if the some values are changed in the input box it stores that value in the rowser's memory / cache 
// by the way -> It is the senior level interview question . That how we will use this slugForm
const slugTransform = useCallback((value) => {

  if( value && typeof value === 'string' ){
    return value 
    .trim()
    .toLowerCase()                       // triming and converting the title that is the string value into the lowercase letters all 
    .replace(/^[a-zA-Z\d\s]+/g , '-')   // This is teh regex value it recognizes some pattern . like in this ; it replaces teh space,special characters with the "-" .
    .replace(/\s/g, '-')

    return ''
  }
}  , [] )



// How is actually the slug value generator is implemented in teh application 
useEffect(() => {

  const subscription = watch((value , {name}) => {  // Here : watch , unsubscribe (value and name object syntax ) is came from  react-hook-form library . These are the features of that .

    if (name === 'title'){
   setValue('slug' , slugTransform(value.title , {shouldValidate: true}))  // title jado likhna tah us vich slugTransform ala method lagake likhna us nu 
    }

  })

  return () => { subscription.unsubscribe()} // this step for optimaztion to clear the space 

} , [ watch , slugTransform , setValue] ) // It depends on the continous watching , the method that generates the slug value and when value of title is seted 

 return (

  
// SARA KUJ HI FORM DE VICH LIKHYA VA DIV , COMPOENTS , BOXES TO FILL INPUT , IMAGES AND LOGIC UPAR LIKHYA VA GA  . AND EH JEHRA FORM GA APA ADVANCED FORM BNA REHE 'react-hook-form' library naal . Jo ki kaam sada easy kr rehi and watch , useForm , unsubcribe , automatic handling form etc ale advanced features provide kr rehii . 
<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            
            
            <div className="w-2/3 px-2">

                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />

                {/* Real time text editor component sidha ohi load krva dita form ch  */}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>



            <div className="w-1/3 px-2">

                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

               {/* The Button component we made  */}
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>

            </div>

        </form>
   

  );
}

export default PostForm
