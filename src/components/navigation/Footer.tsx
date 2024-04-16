import { RiLogosFacebookCircleLine, RiLogosInstagramLine, RiLogosPinterestLine } from "solid-icons/ri";
import { Component } from "solid-js";
import Logo from "../../assets/images/IMG_2282-removebg-preview.png"

const Footer:Component = () => {
	return (
		<footer class="w-full bg-customColor py-16 border-t">
			<div class="w-8/12 m-auto flex flex-wrap ld:flex-wrap lg:border-b border-gray-300 pb-12">
				<div class="w-full lg:w-1/5">
					<img src={Logo} alt="" class="w-28 m-auto md:-m-0" />
				</div>
				<div class="w-1/2 lg:w-1/5">
					<h3 class="font-bold pb-3">Site</h3>
					<ul>
						<li>
							<a href="/">
								Home
							</a>
						</li>
						<li>
							<a href="/shops">
								Shops
							</a>
						</li>
						<li>
							<a href="/contact">
								Contact
							</a>
						</li>
					</ul>
				</div>
				<div class="w-1/2 lg:w-1/5">
					<h3 class="font-bold pb-3">More</h3>
					<ul>
						<li>
							<a href="/influencers">
								Influencers
							</a>
						</li>
					</ul>
				</div>
				<div class="w-1/2 lg:w-1/5 pt-5 md:pt-0">
					<h3 class="font-bold pb-3">Policies</h3>
					<ul>
						<li>
							<a href="/store_policy">
								Store Policy
							</a>
						</li>
						<li>
							<a href="/shipping_returns">
								Shipping & Returns
							</a>
						</li>
						<li>
							<a href="/faq">
								FAQ
							</a>
						</li>
					</ul>
				</div>
				<div class="w-full lg:w-1/5 pt-5 md:pt-0">
					<h3 class="font-bold pb-5">Social Media</h3>
					<ul class="flex md:gap-10 justify-between md:justify-normal">
						<li>
							<RiLogosFacebookCircleLine class="text-2xl"/>
						</li>
						<li>
							<RiLogosInstagramLine class="text-2xl"/>
						</li>
						<li>
							<RiLogosPinterestLine class="text-2xl"/>
						</li>
					</ul>
				</div>
			</div>
		</footer>
	)
}

export default Footer;
