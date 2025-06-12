<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2299.7">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
  </style>
</head>
<body>
<p class="p1">&lt;!DOCTYPE html&gt;</p>
<p class="p1">&lt;html lang="en"&gt;</p>
<p class="p1">&lt;head&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;meta charset="UTF-8"&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;title&gt;Deli's World - Your Ultimate Makeup Destination&lt;/title&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;!-- Tailwind CSS CDN --&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;script src="https://cdn.tailwindcss.com"&gt;&lt;/script&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;!-- Google Fonts - Inter --&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&amp;display=swap" rel="stylesheet"&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;style&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>body {</p>
<p class="p1"><span class="Apple-converted-space">            </span>font-family: 'Inter', sans-serif;</p>
<p class="p1"><span class="Apple-converted-space">            </span>background-color: #f8fafc; /* Light Slate */</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>.gradient-bg {</p>
<p class="p1"><span class="Apple-converted-space">            </span>background: linear-gradient(to right, #fecaca, #fbcfe8); /* Pink to Purple Gradient */</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>.premium-card {</p>
<p class="p1"><span class="Apple-converted-space">            </span>background-color: #fff;</p>
<p class="p1"><span class="Apple-converted-space">            </span>border-radius: 1rem;</p>
<p class="p1"><span class="Apple-converted-space">            </span>box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);</p>
<p class="p1"><span class="Apple-converted-space">            </span>transition: transform 0.3s ease-in-out;</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>.premium-card:hover {</p>
<p class="p1"><span class="Apple-converted-space">            </span>transform: translateY(-5px);</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>.btn-primary {</p>
<p class="p1"><span class="Apple-converted-space">            </span>@apply bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors duration-300 shadow-lg;</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>.btn-secondary {</p>
<p class="p1"><span class="Apple-converted-space">            </span>@apply bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition-colors duration-300;</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>.article-content img {</p>
<p class="p1"><span class="Apple-converted-space">            </span>max-width: 100%;</p>
<p class="p1"><span class="Apple-converted-space">            </span>height: auto;</p>
<p class="p1"><span class="Apple-converted-space">            </span>border-radius: 0.75rem; /* rounded-lg */</p>
<p class="p1"><span class="Apple-converted-space">            </span>margin-bottom: 1.5rem; /* mb-6 */</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>/* Hide sections by default, show only the active one with JS */</p>
<p class="p1"><span class="Apple-converted-space">        </span>.page-section {</p>
<p class="p1"><span class="Apple-converted-space">            </span>display: none;</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>.page-section.active {</p>
<p class="p1"><span class="Apple-converted-space">            </span>display: block;</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>.premium-content-lock {</p>
<p class="p1"><span class="Apple-converted-space">            </span>position: relative;</p>
<p class="p1"><span class="Apple-converted-space">            </span>filter: blur(2px); /* Simulate blur for locked content */</p>
<p class="p1"><span class="Apple-converted-space">            </span>pointer-events: none; /* Disable interaction with blurred content */</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">        </span>.premium-overlay {</p>
<p class="p1"><span class="Apple-converted-space">            </span>position: absolute;</p>
<p class="p1"><span class="Apple-converted-space">            </span>top: 0;</p>
<p class="p1"><span class="Apple-converted-space">            </span>left: 0;</p>
<p class="p1"><span class="Apple-converted-space">            </span>right: 0;</p>
<p class="p1"><span class="Apple-converted-space">            </span>bottom: 0;</p>
<p class="p1"><span class="Apple-converted-space">            </span>background: rgba(255, 255, 255, 0.8);</p>
<p class="p1"><span class="Apple-converted-space">            </span>display: flex;</p>
<p class="p1"><span class="Apple-converted-space">            </span>justify-content: center;</p>
<p class="p1"><span class="Apple-converted-space">            </span>align-items: center;</p>
<p class="p1"><span class="Apple-converted-space">            </span>flex-direction: column;</p>
<p class="p1"><span class="Apple-converted-space">            </span>text-align: center;</p>
<p class="p1"><span class="Apple-converted-space">            </span>padding: 2rem;</p>
<p class="p1"><span class="Apple-converted-space">            </span>border-radius: 0.75rem;</p>
<p class="p1"><span class="Apple-converted-space">            </span>backdrop-filter: blur(5px);</p>
<p class="p1"><span class="Apple-converted-space">            </span>z-index: 10;</p>
<p class="p1"><span class="Apple-converted-space">        </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;/style&gt;</p>
<p class="p1">&lt;/head&gt;</p>
<p class="p1">&lt;body&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;header class="gradient-bg py-8 shadow-md"&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center"&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;!-- Blog Title --&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-4 md:mb-0"&gt;Deli's World&lt;/h1&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;!-- Navigation --&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;nav&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;ul class="flex space-x-6 text-gray-800 text-lg"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;li&gt;&lt;a href="#" class="hover:underline" onclick="showSection('home-section')"&gt;Home&lt;/a&gt;&lt;/li&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;li&gt;&lt;a href="#" class="hover:underline" onclick="showSection('blog-posts-list-section')"&gt;Blog Posts&lt;/a&gt;&lt;/li&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;li&gt;&lt;a href="#" class="hover:underline" onclick="showSection('about-deli-section')"&gt;About Deli&lt;/a&gt;&lt;/li&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;li&gt;&lt;a href="#" class="hover:underline" onclick="showSection('contact-section')"&gt;Contact&lt;/a&gt;&lt;/li&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;/ul&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;/nav&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;/header&gt;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">    </span>&lt;main class="container mx-auto px-4 py-12"&gt;</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;!-- Home Section --&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;section id="home-section" class="page-section active text-center mb-16"&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;h2 class="text-4xl font-semibold text-gray-800 mb-4"&gt;Welcome to Deli's World of Beauty!&lt;/h2&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;p class="text-lg text-gray-600 max-w-2xl mx-auto"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>Dive into a realm where beauty knows no bounds. Discover makeup tips, product reviews, and exclusive tutorials.</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;/p&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;div class="mt-12"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;h3 class="text-3xl font-semibold text-gray-800 mb-8 text-center"&gt;Featured Post&lt;/h3&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;!-- Featured Blog Post - Linking to the Foundation Article --&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;article class="bg-white rounded-xl shadow-lg overflow-hidden group max-w-xl mx-auto"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;img src="https://i.imgur.com/3t7o6dv.jpeg" alt="Deli's Product Review - Face Powder Shades" class="w-full h-48 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;div class="p-6"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                        </span>&lt;h4 class="text-xl font-semibold text-gray-800 mb-2"&gt;My Top 5 Must-Have Foundations of 2025 (Premium!)&lt;/h4&gt;</p>
<p class="p1"><span class="Apple-converted-space">                        </span>&lt;p class="text-gray-600 text-sm mb-4"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                            </span>Unlock my exclusive list of the best foundations for a flawless finish.</p>
<p class="p1"><span class="Apple-converted-space">                        </span>&lt;/p&gt;</p>
<p class="p1"><span class="Apple-converted-space">                        </span>&lt;a href="#" class="text-pink-500 hover:underline font-medium" onclick="showSection('foundation-article-section')"&gt;Read Premium Article &amp;rarr;&lt;/a&gt;</p>
<p class="p1"><span class="Apple-converted-space">                    </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;/article&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;/div&gt;</p>
<p class="p1"><span class="Apple-converted-space">             </span>&lt;!-- Call to Action Section - for premium sign-up --&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;section class="text-center py-12"&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;h3 class="text-3xl font-semibold text-gray-800 mb-4"&gt;Ready to Transform Your Look?&lt;/h3&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;p class="text-lg text-gray-600 mb-8"&gt;Join Deli's World today and embark on your beauty journey!&lt;/p&gt;</p>
<p class="p1"><span class="Apple-converted-space">                </span>&lt;button class="btn-primary" onclick="showSection('premium-plans-section')"&gt;Explore All Plans&lt;/button&gt;</p>
<p class="p1"><span class="Apple-converted-space">            </span>&lt;/section&gt;</p>
<p class="p1"><span class="Apple-converted-space">        </span>&lt;/section&gt;</p>
