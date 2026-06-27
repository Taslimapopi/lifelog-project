const { default: useMessages } = require("../../hooks/useMessages");


const AdminMessagePanel = ({ conversation }) => {

    const {
   _id,
   userId,
   name,
   email
} = co 

   const {
      data: messages=[],
      isPending
   } = useMessages(conversation._id);

}