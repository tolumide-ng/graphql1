const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");

const resolvers = {
	Query: {
		info: () => "This is the API of a Hackernews Clone",
		feed: (root, args, context, info) => {
			return context.prisma.links();
		},
		// link: (parent, args) => links.find(link => link.id === args.id),
	},
	Mutation: {
		post: (root, args, context) => {
			return context.prisma.createLink({
				url: args.url,
				description: args.description,
			});
		},

		// put: (parent, { id, description, url }) => {
		// 	const index = links.indexOf(links.find(link => link.id === id));
		// 	if (description) {
		// 		links[index].description = description;
		// 	}
		// 	if (url) {
		// 		links[index].url = url;
		// 	}
		// 	return links[index];
		// },

		// deleteLink: (parent, args) => {
		// 	const index = links.indexOf(links.find(link => link.id === id));
		// 	links.splice(index, 1);
		// },
	},
};

// 2
const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers,
	context: { prisma },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
