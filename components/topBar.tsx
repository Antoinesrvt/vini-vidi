import React, { useState } from "react";
import {
	Search,
	Bell,
	MessageCircle,
	Menu,
	X,
	User,
	MapPin,
	Plus,
	ChevronDown,
	Settings,
} from "lucide-react-native";

const TopBar = () => {
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [showLocationPicker, setShowLocationPicker] = useState(false);

	const notifications = [
		{ id: 1, type: "activity", message: "New activity near you", unread: true },
		{ id: 2, type: "friend", message: "Sarah joined your group", unread: true },
	];

	return (
		<div className="relative">
			{/* Main Top Bar */}
			<div className="bg-white border-b border-slate-200">
				<div className="max-w-7xl mx-auto">
					<div className="h-16 px-4 flex items-center justify-between gap-4">
						{/* Left Section */}
						<div className="flex items-center gap-3">
							<button className="lg:hidden p-2 hover:bg-slate-100 rounded-full">
								<Menu className="w-5 h-5 text-slate-600" />
							</button>
							<h1 className="text-xl font-semibold text-slate-800">
								Veni Vidi
							</h1>
						</div>

						{/* Center Section - Location Picker */}
						<div className="hidden sm:flex flex-1 justify-center">
							<button
								onClick={() => setShowLocationPicker(!showLocationPicker)}
								className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-medium"
							>
								<MapPin className="w-4 h-4" />
								<span>New York</span>
								<ChevronDown className="w-4 h-4" />
							</button>
						</div>

						{/* Right Section */}
						<div className="flex items-center gap-2">
							<button
								onClick={() => setIsSearchOpen(!isSearchOpen)}
								className="p-2 hover:bg-slate-100 rounded-full"
							>
								<Search className="w-5 h-5 text-slate-600" />
							</button>

							{/* Create Button */}
							<button className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium">
								<Plus className="w-4 h-4" />
								<span>Create</span>
							</button>

							{/* Notifications */}
							<div className="relative">
								<button className="p-2 hover:bg-slate-100 rounded-full">
									<Bell className="w-5 h-5 text-slate-600" />
									{notifications.some((n) => n.unread) && (
										<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
									)}
								</button>
							</div>

							{/* Messages */}
							<button className="p-2 hover:bg-slate-100 rounded-full">
								<MessageCircle className="w-5 h-5 text-slate-600" />
							</button>

							{/* Profile */}
							<button className="flex items-center gap-2 p-1 hover:bg-slate-100 rounded-full">
								<div className="w-8 h-8 rounded-full bg-slate-200" />
								<ChevronDown className="w-4 h-4 text-slate-600 hidden sm:block" />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Search Overlay */}
			{isSearchOpen && (
				<div className="absolute top-0 left-0 right-0 bg-white border-b border-slate-200 p-4 shadow-lg animate-in slide-in-from-top">
					<div className="max-w-2xl mx-auto flex gap-4">
						<div className="flex-1 relative">
							<input
								type="text"
								placeholder="Search activities, groups, or people..."
								className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<Search className="w-5 h-5 text-slate-400 absolute left-3 top-2" />
						</div>
						<button
							onClick={() => setIsSearchOpen(false)}
							className="p-2 hover:bg-slate-100 rounded-full"
						>
							<X className="w-5 h-5 text-slate-600" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default TopBar;
