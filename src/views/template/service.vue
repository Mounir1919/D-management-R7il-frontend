<template>

        <!-- Content
		============================================= -->
        <section id="content">

            <div class="content-wrap pb-0">

              <div class="container">

					<div id="section-pricing" class="page-section p-0 m-0">



						<div id="pricing-switch" class="pricing row col-mb-30 mb-5">

							<div class="col-lg-4 col-md-6">

								<div class="pricing-box text-center">
									<div class="pricing-title text-uppercase">
										<h3>Starter</h3>
									</div>
									<div class="pricing-price">
										FREE<span class="price-tenure">Limited Access</span>
									</div>
									<div class="pricing-features border-0 bg-transparent">
										<ul>
											<li><strong>Full</strong> Access</li>
											<li><i class="bi-braces"></i> Source Files</li>
											<li><strong>100</strong> User Accounts</li>
											<li><strong>1 Year</strong> License</li>
											<li>Phone &amp; Email Support</li>
										</ul>
									</div>
									<div class="pricing-action">
										<a href="demo-app-landing.html#modal-get-started" data-lightbox="inline" data-pricing-plan="Starter Plan" class="button button-large button-rounded text-capitalize ls-0" style="border-radius: 23px;">Get Started</a>
									</div>
								</div>

							</div>

							<div class="col-lg-4 col-md-6">

								<div class="pricing-box text-center">
									<div class="pricing-title text-uppercase">
										<h3>Professional</h3>
									</div>
									<div class="pricing-price">
										<div class="pts-content pts-content-false"><span class="price-unit">&dollar;</span>12<span class="price-tenure">Monthly</span></div>
										<div class="pts-content pts-content-true"><span class="price-unit">&dollar;</span>99<span class="price-tenure">Yearly</span></div>
									</div>
									<div class="pricing-features border-0 bg-transparent">
										<ul>
											<li><strong>Full</strong> Access</li>
											<li><i class="bi-braces"></i> Source Files</li>
											<li><strong>1000</strong> User Accounts</li>
											<li><strong>2 Years</strong> License</li>
											<li><i class="bi-star-fill"></i>
											<i class="bi-star-fill"></i>
											<i class="bi-star-fill"></i>
											<i class="bi-star-fill"></i>
											<i class="bi-star-fill"></i></li>
										</ul>
									</div>
									<div class="pricing-action">
										<div class="pts-content pts-content-false"><a href="demo-app-landing.html#modal-get-started" data-lightbox="inline" data-pricing-plan="Professional Monthly Plan" class="button button-large button-rounded text-capitalize ls-0" style="border-radius: 23px;">Start Free Trial</a></div>
										<div class="pts-content pts-content-true"><a href="demo-app-landing.html#modal-get-started" data-lightbox="inline" data-pricing-plan="Professional Yearly Plan" class="button button-large button-rounded text-capitalize ls-0" style="border-radius: 23px;">Start Free Trial</a></div>
									</div>
								</div>

							</div>

							<div class="col-lg-4 offset-lg-0 col-md-6 offset-md-3">

								<div class="pricing-box text-center">
									<div class="pricing-title text-uppercase">
										<h3>Business</h3>
									</div>
									<div class="pricing-price">
										<div class="pts-content pts-content-false"><span class="price-unit">&dollar;</span>19<span class="price-tenure">Monthly</span></div>
										<div class="pts-content pts-content-true"><span class="price-unit">&dollar;</span>149<span class="price-tenure">Yearly</span></div>
									</div>
									<div class="pricing-features border-0 bg-transparent">
										<ul>
											<li><strong>Full</strong> Access</li>
											<li><i class="bi-braces"></i> Source Files</li>
											<li><strong>500</strong> User Accounts</li>
											<li><strong>3 Years</strong> License</li>
											<li>Phone &amp; Email Support</li>
										</ul>
									</div>
									<div class="pricing-action">
										<div class="pts-content pts-content-false"><a href="demo-app-landing.html#modal-get-started" data-lightbox="inline" data-pricing-plan="Business Monthly Plan" class="button button-large button-rounded text-capitalize ls-0" style="border-radius: 23px;">Start Free Trial</a></div>
										<div class="pts-content pts-content-true"><a href="demo-app-landing.html#modal-get-started" data-lightbox="inline" data-pricing-plan="Business Yearly Plan" class="button button-large button-rounded text-capitalize ls-0" style="border-radius: 23px;">Start Free Trial</a></div>
									</div>
								</div>

							</div>

						</div>

						<!-- Modal -->
						<div class="modal1 mfp-hide" id="modal-get-started">
							<div class="block mx-auto" style="background-color: #FFF; max-width: 800px;">
								<div class="form-widget p-5" data-loader="button">
									<div class="form-result"></div>
									<form action="demo-app-landing.html#" id="get-started-form" method="post" class="mb-0">

										<div class="row">
											<div class="col-md-8">
												<h3 class="font-body">Register for an Account</h3>
											</div>
											<div class="col-md-4">
												<div id="modal-get-started-package"></div>
											</div>
										</div>

										<div class="row">
											<div class="col-md-6 form-group">
												<label class="font-body text-capitalize" for="get-started-form-username">Choose Username:</label>
												<input type="text" id="get-started-form-username" name="get-started-form-username" value="" class="form-control required no-error-msg">
											</div>

											<div class="col-md-6 form-group">
												<label class="font-body text-capitalize" for="get-started-form-email">Your Email:</label>
												<input type="email" id="get-started-form-email" name="get-started-form-email" value="" class="form-control required email no-error-msg">
											</div>

											<div class="w-100"></div>

											<div class="col-md-6 form-group">
												<label class="font-body text-capitalize" for="get-started-form-password">Choose Password:</label>
												<input type="password" id="get-started-form-password" name="get-started-form-password" value="" class="form-control required no-error-msg">
											</div>

											<div class="col-md-6 form-group">
												<label class="font-body text-capitalize" for="get-started-form-password">Retype Password:</label>
												<input type="password" id="get-started-form-repassword" name="get-started-form-repassword" value="" class="form-control required no-error-msg">
											</div>

											<!-- Package Selector Hidden Input Value Setter -->
											<input type="hidden" id="get-started-form-package" name="get-started-form-package" value="Free">

											<div class="col-12 form-group">
												<label>
													<input type="checkbox" id="get-started-form-agree" name="get-started-form-agree" value="1" style="position: relative; top: 2px; margin-right: 5px;"> I Agree to the Terms &amp; Conditions
												</label>
											</div>

											<div class="col-12 form-group">
												<div class="d-flex justify-content-between">
													<button class="button button-rounded m-0" id="get-started-form-submit" name="get-started-form-submit" value="login">Get Started</button>
													<a href="demo-app-landing.html#" data-scrollto="#section-pricing" data-easing="easeInOutExpo" data-speed="1250" data-offset="160" onClick="jQuery.magnificPopup.close();">Change Plan?</a>
												</div>
											</div>
										</div>

									</form>
								</div>
							</div>
						</div>

					</div>

					<div class="clear"></div>



				</div>
            </div>
        </section><!-- #content end -->
</template>

<script>

export default {
    name: 'ServicePage',

}
</script>
<style scoped>
.bg-color {
    background-color: rgb(178 59 59) !important;
}

#slider .nav-link:hover:not(.active) {
    border-color: rgba(255, 255, 255, .25);
    background-color: rgba(165, 42, 42, 0.7);
}
</style>
