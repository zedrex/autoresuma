
import { DataTypes, Model,Optional } from "sequelize";
import { sequelize } from "../config/db.config";
import Education from "./education";
import Experience from "./experience";
//import Experience from "./experience";


interface UserAttributes{
	id: string;
	username: string;
	firstName : string;
	lastName : string;
	email: string;
	password: string;
	title: string;
	github: string;
	linkedin: string;
	completed: boolean;

};

/*
we have to decide the AuthorCreationAttributes to
tell Sequelize and typescript that the propterty id,
in that case is optional to be passed at creation time.
 */

interface UserCreationAttributes extends Optional<UserAttributes,'id'>{}

interface UserInstance extends Model<UserAttributes,UserCreationAttributes>,
UserAttributes{
	createdAt?: Date;
	updatedAt?: Date;
}

const User = sequelize.define<UserInstance>(
	'User',
	{
		id:{
			allowNull: false,
			autoIncrement: false,
			primaryKey:true,
			type:DataTypes.UUID,
			unique:true,
		},

		username:{
			allowNull: false,
			type: DataTypes.TEXT,

		},
		firstName:{
			allowNull: false,
			type: DataTypes.TEXT,
		},

		lastName:{
			allowNull: false,
			type: DataTypes.TEXT,
		},
		email:{
			allowNull: true,
			type:DataTypes.TEXT,
		},

		password:{
			allowNull : false,
			type: DataTypes.TEXT,
		},
		title:{
			allowNull: true,
			type: DataTypes.TEXT,
		},
		github:{
			allowNull: true,
			type: DataTypes.TEXT,
		},
		linkedin:{
			allowNull: true,
			type: DataTypes.TEXT,
		},
		completed:{
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		}
	}
);
//education
User.hasMany(Education,{
	//can omit the source key property since by default sequelize will use the primary key defined in the model

	sourceKey: 'id',
	foreignKey: 'userId',
	as: 'user'
});


Education.belongsTo(User,{
	foreignKey:'userId',
	as:'user'
});
//Education ends

//experience

User.hasMany(Experience,{
	sourceKey:'id',
	foreignKey: 'userId',
	as:'userexp'
});

Experience.belongsTo(User,{
	foreignKey: 'userId',
	as: 'userexp'
});


//experience ends

//skills
//skills ends

//projects
//projects ends

//resume
//resume ends




export default User;
