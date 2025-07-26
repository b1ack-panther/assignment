"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Heart,
	MessageCircle,
	Send,
	Bookmark,
	MoreHorizontal,
	Phone,
	Video,
	ChevronLeft,
} from "lucide-react";
import Image from "next/image";

interface Post {
	id: string;
	image: string;
	username: string;
	caption: string;
	likes: number;
	comments: number;
}

interface Comment {
	id: string;
	username: string;
	text: string;
	avatar: string;
	timestamp: string;
}

interface Message {
	id: string;
	text: string;
	sender: "user" | "bot";
	timestamp: string;
}

const dummyPosts: Post[] = [
	{
		id: "1",
		image:
			"https://images.stockcake.com/public/1/7/e/17e3d856-fa51-4727-99d2-1a292ec89765_large/futuristic-technology-portrait-stockcake.jpg",
		username: "techguru",
		caption: "Amazing new tech trends! 🚀 #technology #innovation",
		likes: 1234,
		comments: 89,
	},
	{
		id: "2",
		image:
			"https://images.stockcake.com/public/9/6/7/967020b9-0db9-41b5-96f3-6024d93bbc41_large/silhouetted-tree-arch-stockcake.jpg",
		username: "wanderlust",
		caption: "Beautiful sunset from my travels ✈️ #travel #sunset",
		likes: 2156,
		comments: 156,
	},
	{
		id: "3",
		image:
			"https://images.stockcake.com/public/5/c/6/5c651eb1-e870-4f5f-9f00-b22c35b73ef5_large/nature-human-connection-stockcake.jpg",
		username: "foodie_life",
		caption: "Delicious homemade pasta 🍝 #food #cooking",
		likes: 987,
		comments: 67,
	},
	{
		id: "4",
		image:
			"https://images.stockcake.com/public/d/e/d/ded45393-e812-49a1-a9bc-1535828864a4_large/futuristic-facial-recognition-stockcake.jpg",
		username: "fitnessmotiv",
		caption: "Morning workout complete! 💪 #fitness #motivation",
		likes: 1876,
		comments: 234,
	},
];

const initialComments: Comment[] = [
	{
		id: "1",
		username: "user123",
		text: "Amazing post! Love it 😍",
		avatar: "/placeholder.svg?height=24&width=24",
		timestamp: "2h",
	},
	{
		id: "2",
		username: "follower456",
		text: "This is so inspiring!",
		avatar: "/placeholder.svg?height=24&width=24",
		timestamp: "1h",
	},
];

export default function InstagramAutomationFlow() {
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);
	const [showCommentSection, setShowCommentSection] = useState(false);
	const [showMessageSection, setShowMessageSection] = useState(false);
	const [newComment, setNewComment] = useState("");
	const [comments, setComments] = useState<Comment[]>(initialComments);
	const [newMessage, setNewMessage] = useState("");
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			text: "Hey there! I'm so happy you're here, thanks so much for your interest 😊",
			sender: "bot",
			timestamp: "now",
		},
		{
			id: "2",
			text: "Click below and I'll send you the link in just a sec ✨",
			sender: "bot",
			timestamp: "now",
		},
	]);
	const [keywordFilter, setKeywordFilter] = useState("");

	const handlePostSelect = (post: Post) => {
		setSelectedPost(post);
		setShowCommentSection(true);
	};

	const handleAddComment = () => {
		if (newComment.trim()) {
			const comment: Comment = {
				id: Date.now().toString(),
				username: "you",
				text: newComment,
				avatar: "/placeholder.svg?height=24&width=24",
				timestamp: "now",
			};
			setComments([...comments, comment]);
			setNewComment("");
		}
	};

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			const message: Message = {
				id: Date.now().toString(),
				text: newMessage,
				sender: "user",
				timestamp: "now",
			};
			setMessages([...messages, message]);
			setNewMessage("");
		}
	};

	const handleNextToMessaging = () => {
		setShowMessageSection(true);
	};

	const getCurrentMobileView = () => {
		if (showMessageSection) {
			return "messaging";
		} else if (showCommentSection && selectedPost) {
			return "comments";
		} else if (selectedPost) {
			return "post-view";
		}
		return "selection";
	};

	return (
		<div className="min-h-screen bg-gray-50 p-2">
			<div className="max-w-5xl mx-auto">
				<div className="grid lg:grid-cols-2 gap-4">
					{/* Left Panel - Progressive Configuration */}
					<div className="space-y-3">
						{/* Header */}
						<div className="bg-white rounded-lg p-3">
							<div className="flex items-center gap-2 mb-3">
								<div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs font-bold">
									m
								</div>
								<h1 className="text-base font-semibold">
									Instagram Automation Flow
								</h1>
							</div>
						</div>

						{/* Step 1: Post Selection */}
						<div className="bg-white rounded-lg p-3">
							<h2 className="text-sm font-medium mb-2">
								When someone comments on
							</h2>
							<div className="mb-3">
								<p className="text-xs text-gray-600 mb-2">
									• a specific post or reel
								</p>
								<div className="grid grid-cols-4 gap-1 mb-2">
									{dummyPosts.map((post) => (
										<div
											key={post.id}
											className={`relative cursor-pointer hover:opacity-80 transition-all border-2 rounded ${
												selectedPost?.id === post.id
													? "border-blue-500"
													: "border-transparent"
											}`}
											onClick={() => handlePostSelect(post)}
										>
											<Image
												src={post.image || "/placeholder.svg"}
												alt={`Post by ${post.username}`}
												width={80}
												height={80}
												className="rounded object-cover w-full aspect-square"
											/>
											{selectedPost?.id === post.id && (
												<div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded flex items-center justify-center">
													<div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
														<div className="w-1.5 h-1.5 bg-white rounded-full"></div>
													</div>
												</div>
											)}
										</div>
									))}
								</div>
								<Button
									variant="link"
									className="text-blue-500 p-0 text-xs h-auto"
								>
									Show All
								</Button>
							</div>

							<div className="space-y-1">
								<div className="flex items-center justify-between p-2 border rounded text-xs">
									<span>any post or reel</span>
									<Badge variant="secondary" className="text-xs px-1 py-0">
										PRO
									</Badge>
								</div>
								<div className="flex items-center justify-between p-2 border rounded text-xs">
									<span>next post or reel</span>
									<Badge variant="secondary" className="text-xs px-1 py-0">
										PRO
									</Badge>
								</div>
							</div>
						</div>

						{/* Step 2: Comment Configuration */}
						{showCommentSection && (
							<div className="bg-white rounded-lg p-3 border-l-4 border-blue-500">
								<h2 className="text-sm font-medium mb-2">
									And this comment has
								</h2>
								<div className="mb-3">
									<p className="text-xs text-gray-600 mb-1">
										• a specific word or words
									</p>
								</div>

								<div className="mb-3">
									<div className="flex gap-1">
										<Input
											value={newComment}
											onChange={(e) => setNewComment(e.target.value)}
											placeholder="Type a comment..."
											className="flex-1 text-xs h-8"
											onKeyPress={(e) =>
												e.key === "Enter" && handleAddComment()
											}
										/>
										<Button
											onClick={handleAddComment}
											disabled={!newComment.trim()}
											size="sm"
											className="text-xs h-8 px-2"
										>
											Add
										</Button>
									</div>

									<p className="text-xs text-gray-600 mb-1">
										• add commas to seperate words
									</p>
								</div>

								<Button
									onClick={handleNextToMessaging}
									className="w-full text-xs h-8"
								>
									Next: Configure Messaging
								</Button>
							</div>
						)}

						{/* Step 3: Message Configuration */}
						{showMessageSection && (
							<div className="bg-white rounded-lg p-3 border-l-4 border-green-500">
								<h2 className="text-sm font-medium mb-2">They will get</h2>
								<div className="mb-3">
									<div className="flex items-center justify-between mb-2">
										<span className="text-xs">an opening DM</span>
										<div className="w-8 h-4 bg-green-500 rounded-full relative">
											<div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5"></div>
										</div>
									</div>

									<div className="bg-gray-50 p-2 rounded mb-2">
										<p className="text-xs mb-1">
											Hey there! Im so happy youre here, thanks so much for
											your interest 😊
										</p>
										<p className="text-xs mb-2">
											Click below and Ill send you the link in just a sec ✨
										</p>
										<Button
											variant="outline"
											size="sm"
											className="text-xs h-6 px-2 bg-transparent"
										>
											Send me the link
										</Button>
									</div>

									<p className="text-xs text-blue-500 mb-2 cursor-pointer">
										ℹ️ Why does an Opening DM matter?
									</p>

									<div className="mb-3">
										<p className="text-xs font-medium mb-1">
											Send a custom message:
										</p>
										<div className="flex gap-1 mb-1">
											<Textarea
												value={newMessage}
												onChange={(e) => setNewMessage(e.target.value)}
												placeholder="Write a message"
												className="flex-1 text-xs"
												rows={2}
											/>
										</div>
										<div className="flex gap-1">
											<Button
												onClick={handleSendMessage}
												disabled={!newMessage.trim()}
												size="sm"
												className="text-xs h-7 px-2"
											>
												<Send className="w-3 h-3 mr-1" />
												Send
											</Button>
											<Button
												variant="outline"
												size="sm"
												className="text-xs h-7 px-2 bg-transparent"
											>
												+ Link
											</Button>
										</div>
										<p className="text-xs text-gray-500 mt-1">
											Create the DM youd like to send
										</p>
									</div>
								</div>

								<Button
									onClick={() => alert("Automation configured successfully!")}
									className="w-full bg-green-600 hover:bg-green-700 text-xs h-8"
								>
									Complete Setup
								</Button>
							</div>
						)}
					</div>

					{/* Right Panel - Mobile Preview */}
					<div className="flex justify-center sticky top-2">
						<div className="w-64 h-[500px] bg-black rounded-2xl p-1.5 relative">
							<div className="w-full h-full bg-black rounded-xl overflow-hidden absolute top-2 right-0">
								{/* Status Bar */}
								<div className="absolute top-0 left-0 right-0 h-6 bg-black z-10 flex items-center justify-center">
									<div className="w-16 h-0.5 bg-white rounded-full"></div>
								</div>

								{getCurrentMobileView() === "selection" && (
									<div className="pt-6 h-full bg-black text-white flex items-center justify-center">
										<div className="text-center">
											<h3 className="text-sm font-medium">Select a Post</h3>
											<p className="text-xs text-gray-400 mt-1">
												Choose a post to configure automation
											</p>
										</div>
									</div>
								)}

								{getCurrentMobileView() === "post-view" && selectedPost && (
									<div className="pt-6 h-full bg-black text-white">
										{/* Header */}
										<div className="flex items-center justify-between p-2 border-b border-gray-800">
											<div className="flex items-center gap-2">
												<Avatar className="w-6 h-6">
													<AvatarImage src="/placeholder.svg?height=24&width=24" />
													<AvatarFallback className="text-xs">
														{selectedPost.username[0].toUpperCase()}
													</AvatarFallback>
												</Avatar>
												<span className="text-xs font-medium">
													{selectedPost.username}
												</span>
											</div>
											<MoreHorizontal className="w-4 h-4" />
										</div>

										{/* Post Image */}
										<div className="relative">
											<Image
												src={selectedPost.image || "/placeholder.svg"}
												alt="Post"
												width={256}
												height={256}
												className="w-full aspect-square object-cover"
											/>
										</div>

										{/* Actions */}
										<div className="p-2">
											<div className="flex items-center justify-between mb-2">
												<div className="flex items-center gap-3">
													<Heart className="w-5 h-5" />
													<MessageCircle className="w-5 h-5" />
													<Send className="w-5 h-5" />
												</div>
												<Bookmark className="w-5 h-5" />
											</div>

											<p className="text-xs mb-1">
												{selectedPost.likes.toLocaleString()} likes
											</p>
											<p className="text-xs">
												<span className="font-medium">
													{selectedPost.username}
												</span>{" "}
												{selectedPost.caption}
											</p>
											<p className="text-gray-400 text-xs mt-1">
												View all {selectedPost.comments} comments
											</p>
										</div>
									</div>
								)}

								{getCurrentMobileView() === "comments" && selectedPost && (
									<div className="pt-6 h-full bg-black text-white flex flex-col">
										{/* Header */}
										<div className="flex items-center justify-between p-2 border-b border-gray-800">
											<ChevronLeft className="w-5 h-5" />
											<span className="text-xs font-medium">Comments</span>
											<Send className="w-5 h-5" />
										</div>

										{/* Partial Post Image */}
										<div className="relative h-16 overflow-hidden">
											<Image
												src={selectedPost.image || "/placeholder.svg"}
												alt="Post"
												width={256}
												height={64}
												className="w-full h-16 object-cover object-top"
											/>
											<div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black to-transparent"></div>
										</div>

										{/* Comments List */}
										<div className="flex-1 p-2 space-y-2 overflow-y-auto">
											{comments.map((comment) => (
												<div key={comment.id} className="flex gap-2">
													<Avatar className="w-6 h-6">
														<AvatarImage
															src={comment.avatar || "/placeholder.svg"}
														/>
														<AvatarFallback className="text-xs">
															{comment.username[0].toUpperCase()}
														</AvatarFallback>
													</Avatar>
													<div className="flex-1">
														<p className="text-xs">
															<span className="font-medium">
																{comment.username}
															</span>{" "}
															{comment.text}
														</p>
														<div className="flex items-center gap-3 mt-0.5">
															<span className="text-xs text-gray-400">
																{comment.timestamp}
															</span>
															<span className="text-xs text-gray-400 cursor-pointer">
																Reply
															</span>
														</div>
													</div>
													<Heart className="w-3 h-3 mt-1" />
												</div>
											))}
										</div>

										{/* Comment Input */}
										<div className="p-2 border-t border-gray-800">
											<div className="flex items-center gap-2">
												<Avatar className="w-6 h-6">
													<AvatarFallback className="text-xs">Y</AvatarFallback>
												</Avatar>
												<div className="flex-1 flex gap-1">
													<Input
														value={newComment}
														onChange={(e) => setNewComment(e.target.value)}
														placeholder="Add a comment..."
														className="flex-1 bg-transparent border-none text-white placeholder-gray-400 text-xs h-7"
														onKeyPress={(e) =>
															e.key === "Enter" && handleAddComment()
														}
													/>
													<Button
														size="sm"
														onClick={handleAddComment}
														disabled={!newComment.trim()}
														className="text-xs h-7 px-2"
													>
														Post
													</Button>
												</div>
											</div>
										</div>
									</div>
								)}

								{getCurrentMobileView() === "messaging" && (
									<div className="pt-6 h-full bg-black text-white flex flex-col sticky">
										{/* Header */}
										<div className="flex items-center justify-between p-2 border-b border-gray-800">
											<div className="flex items-center gap-2">
												<ChevronLeft className="w-5 h-5" />
												<Avatar className="w-6 h-6">
													<AvatarFallback className="text-xs">B</AvatarFallback>
												</Avatar>
												<span className="text-xs font-medium">botspacehq</span>
											</div>
											<div className="flex items-center gap-2 sticky">
												<Phone className="w-4 h-4" />
												<Video className="w-4 h-4" />
											</div>
										</div>

										{/* Messages */}
										<div className="flex-1 p-2 space-y-2 overflow-y-auto">
											{messages.map((message) => (
												<div
													key={message.id}
													className={`flex ${
														message.sender === "user"
															? "justify-end"
															: "justify-start"
													}`}
												>
													<div
														className={`rounded-xl p-2 max-w-xs ${
															message.sender === "user"
																? "bg-blue-600 text-white"
																: "bg-gray-800 text-white"
														}`}
													>
														<p className="text-xs">{message.text}</p>
													</div>
												</div>
											))}
										</div>

										{/* Message Input */}
										<div className="p-2 border-t border-gray-800">
											<div className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1">
												<Input
													value={newMessage}
													onChange={(e) => setNewMessage(e.target.value)}
													placeholder="Message..."
													className="flex-1 bg-transparent border-none text-white placeholder-gray-400 text-xs h-6"
													onKeyPress={(e) =>
														e.key === "Enter" && handleSendMessage()
													}
												/>
												<Button
													size="sm"
													onClick={handleSendMessage}
													disabled={!newMessage.trim()}
													className="h-6 w-6 p-0"
												>
													<Send className="w-3 h-3" />
												</Button>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
