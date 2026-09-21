import React ,{useCallback , useEffect, useState} from 'react'
import { useForm } from 'react-hook-form'
import {Button , Input , Select , RTE } from '../Index'
import appwriteService from '../../Appwrite/Configs'
import { data, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({post}) {
  const [submitError, setSubmitError] = useState('');

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
const userData = useSelector((state) => state.auth?.userData)    // The application stores the authenticated user under auth.userData.

// method jihde naal post update ya new create honi 
const submit = async (data) => {
  setSubmitError('');

  if (!userData?.$id) {
    navigate('/login', { replace: true });
    return;
  }

  const title = data.title?.trim();
  const slug = (data.slug || slugTransform(title || '')).trim();

  if (!title || !slug) {
    setSubmitError('Title and slug are required.');
    return;
  }

  try {
    if (post) {
      const file = data.image && data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file && post.featuredImage) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        title,
        slug,
        featuredImage: file ? file.$id : (post.featuredImage || ''),
        status: data.status || 'active',
      });

      if (dbPost) {
        navigate(`/post/${dbPost.slug || dbPost.$id}`);
        return;
      }

      setSubmitError('Failed to update the post. Please check Appwrite table data and permissions.');
      return;
    }

    const file = data.image && data.image[0]
      ? await appwriteService.uploadFile(data.image[0])
      : null;

    if (data.image && data.image[0] && !file) {
      throw new Error('Featured image upload failed.');
    }

    const dbPost = await appwriteService.createPost({
      title,
      slug,
      content: data.content || '',
      featuredImage: file ? file.$id : '',
      status: data.status || 'active',
      userId: userData.$id,
      image: data.image,
    });

    if (dbPost) {
      navigate(`/post/${dbPost.slug || dbPost.$id}`);
      return;
    }

    setSubmitError('Failed to create the post. Appwrite row creation returned no data.');
  } catch (error) {
    console.error('PostForm :: submit failed', error);
    setSubmitError(error?.message || 'Failed to save the post. Check Appwrite table and permissions.');
  }
};

// This is a functionality in which if we write the title and give space between them then the slug value box will conveert that space into dash "-" . UseCallback is used because :- To want the memoization in which the component will not re-render as only if the some values are changed in the input box it stores that value in the rowser's memory / cache 
// by the way -> It is the senior level interview question . That how we will use this slugForm
const slugTransform = useCallback((value) => {
  if (!value || typeof value !== 'string') {
    return '';
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]+/g, '');
}, []);



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

               {submitError && (
                  <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {submitError}
                  </div>
               )}

               {/* The Button component we made  */}
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>

            </div>

        </form>
   

  );
}

export default PostForm
