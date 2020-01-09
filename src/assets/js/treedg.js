export  function recursion(json)
{
   
       for(let i=0;i<json.length;i++)
        {  
            if(json[i].leaf==false)
            {   
                json[i].icon="el-icon-lx-file"
                recursion(json[i].children);
            }
            else
            {
            json[i].icon="el-icon-lx-text";
            
            }
        }
}